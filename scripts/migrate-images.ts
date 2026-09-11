// One-off migration: WordPress uploads -> local backup + Cloudinary.
//
// For every image referenced in app/data (project covers, galleries, tab
// galleries, and the About Steve portrait):
//   1. Download the original into the external-drive backup folder,
//      organized by project slug (skipped if already downloaded).
//   2. Upload it to Cloudinary as `sds/<project-slug>/<basename>`
//      (overwrite: false, so reruns are safe).
//   3. Record the WordPress URL -> Cloudinary public ID mapping in
//      scripts/migration-map.json for the data rewrite step.
//
// Usage:
//   npx tsx scripts/migrate-images.ts             # backup + upload
//   npx tsx scripts/migrate-images.ts --dry-run   # print the plan only
//   npx tsx scripts/migrate-images.ts --backup-only  # download, no upload
//
// Requires CLOUDINARY_URL in .env (cloudinary://<api_key>:<api_secret>@<cloud_name>)
// unless --backup-only or --dry-run.

import 'dotenv/config'
import { access, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { v2 as cloudinary } from 'cloudinary'
import { projects, type ProjectImage } from '../app/data/projects'
import { aboutSteveKim } from '../app/data/pages'

const BACKUP_ROOT =
  '/Volumes/My Passport/mikegoldberg/FreeLance Work/Accounts/Silver Dragon Squadron/images/cloudinary_migration'
const MAP_FILE = path.join(import.meta.dirname, 'migration-map.json')

const DRY_RUN = process.argv.includes('--dry-run')
const BACKUP_ONLY = process.argv.includes('--backup-only')

interface Entry {
  url: string
  slug: string
  filename: string // original filename, e.g. IMG_1294.jpg
  publicId: string // e.g. sds/parachute/IMG_1294
}

function collect(): Entry[] {
  const byUrl = new Map<string, Entry>()
  const byPublicId = new Map<string, Entry>()

  function add(slug: string, url: string | undefined) {
    if (!url) return
    if (!/^https?:\/\//i.test(url)) return // already migrated
    if (byUrl.has(url)) return // dedupe: first project that uses it owns it
    const filename = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? '')
    if (!filename) throw new Error(`Cannot derive filename from ${url}`)
    const base = filename.replace(/\.[a-z0-9]+$/i, '')
    const publicId = `sds/${slug}/${base}`
    const clash = byPublicId.get(publicId)
    if (clash) {
      throw new Error(
        `public_id collision: ${publicId}\n  ${clash.url}\n  ${url}\nRename one before migrating.`,
      )
    }
    const entry: Entry = { url, slug, filename, publicId }
    byUrl.set(url, entry)
    byPublicId.set(publicId, entry)
  }

  const addImages = (slug: string, images?: ProjectImage[]) =>
    images?.forEach((img) => add(slug, img.src))

  for (const p of projects) {
    add(p.slug, p.cover)
    addImages(p.slug, p.gallery)
    p.tabs?.forEach((tab) => addImages(p.slug, tab.images))
  }
  // Same file as a pilot-in-command portrait; dedupe usually resolves it there.
  add('pilot-in-command', aboutSteveKim.photo)

  return [...byUrl.values()]
}

async function exists(file: string): Promise<boolean> {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

async function download(entry: Entry): Promise<{ file: string; skipped: boolean }> {
  const dir = path.join(BACKUP_ROOT, entry.slug)
  const file = path.join(dir, entry.filename)
  if (await exists(file)) return { file, skipped: true }
  const res = await fetch(entry.url)
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${entry.url}`)
  await mkdir(dir, { recursive: true })
  await writeFile(file, Buffer.from(await res.arrayBuffer()))
  return { file, skipped: false }
}

async function upload(entry: Entry, file: string) {
  await cloudinary.uploader.upload(file, {
    public_id: entry.publicId,
    resource_type: 'image',
    overwrite: false, // rerun-safe: existing assets are left untouched
    unique_filename: false,
    use_filename: false,
  })
}

async function main() {
  const entries = collect()
  console.log(`${entries.length} unique images across ${new Set(entries.map((e) => e.slug)).size} folders`)

  if (DRY_RUN) {
    for (const e of entries) console.log(`${e.url}\n  -> ${e.publicId}`)
    return
  }

  if (!(await exists(BACKUP_ROOT))) {
    throw new Error(`Backup folder not reachable (is the drive mounted?): ${BACKUP_ROOT}`)
  }
  if (!BACKUP_ONLY && !cloudinary.config().cloud_name) {
    throw new Error('CLOUDINARY_URL is not set in .env — see .env.example')
  }

  const failures: { entry: Entry; error: string }[] = []
  let downloaded = 0
  let uploaded = 0

  // Small concurrency pool: gentle on the WP host, fast enough for 216 files.
  const queue = [...entries]
  async function worker() {
    for (let e = queue.shift(); e; e = queue.shift()) {
      try {
        const { file, skipped } = await download(e)
        if (!skipped) downloaded++
        if (!BACKUP_ONLY) {
          await upload(e, file)
          uploaded++
        }
        console.log(`ok  ${e.publicId}${skipped ? ' (backup existed)' : ''}`)
      } catch (err) {
        failures.push({ entry: e, error: String(err) })
        console.error(`FAIL ${e.url}: ${err}`)
      }
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker))

  if (!BACKUP_ONLY && failures.length === 0) {
    const map = Object.fromEntries(entries.map((e) => [e.url, e.publicId]))
    await writeFile(MAP_FILE, JSON.stringify(map, null, 2) + '\n')
    console.log(`\nWrote ${MAP_FILE}`)
  }

  console.log(
    `\nDone: ${downloaded} downloaded, ${uploaded} uploaded, ` +
      `${entries.length - downloaded - failures.length} backups already present, ${failures.length} failed`,
  )
  if (failures.length) {
    console.error('\nFailures (rerun the script to retry just these):')
    failures.forEach((f) => console.error(`  ${f.entry.url}: ${f.error}`))
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})

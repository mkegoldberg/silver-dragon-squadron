// Step 2 of the Cloudinary migration: rewrite app/data/projects.ts and
// app/data/pages.ts, replacing every WordPress upload URL with the Cloudinary
// public ID recorded in scripts/migration-map.json by migrate-images.ts.
//
//   `${WP}/2024/10/IMG_1294.jpg`  ->  'sds/parachute/IMG_1294'
//   'https://.../steve.jpg'       ->  'sds/pilot-in-command/steve'
//
// Refuses to finish if any wp-content URL remains afterwards, so a stale or
// incomplete map cannot half-migrate the data files.
//
// Usage: npx tsx scripts/rewrite-data.ts

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.join(import.meta.dirname, '..')
const MAP_FILE = path.join(import.meta.dirname, 'migration-map.json')
const WP_BASE = 'https://silverdragonsquadron.com/wp-content/uploads'
const DATA_FILES = ['app/data/projects.ts', 'app/data/pages.ts']

const map: Record<string, string> = JSON.parse(await readFile(MAP_FILE, 'utf8'))

for (const rel of DATA_FILES) {
  const file = path.join(root, rel)
  let src = await readFile(file, 'utf8')

  for (const [url, publicId] of Object.entries(map)) {
    const suffix = url.slice(WP_BASE.length) // e.g. /2024/10/IMG_1294.jpg
    src = src
      .replaceAll('`${WP}' + suffix + '`', `'${publicId}'`)
      .replaceAll(`'${url}'`, `'${publicId}'`)
  }

  // The WP base const is dead code once every URL is rewritten.
  src = src.replace(`const WP = '${WP_BASE}'\n\n`, '').replace(`const WP = '${WP_BASE}'\n`, '')

  const leftover = src.match(/wp-content\/uploads[^'"`\s]*/g)
  if (leftover) {
    console.error(`${rel}: unmigrated URLs remain (not in migration-map.json):`)
    leftover.forEach((u) => console.error(`  ${u}`))
    process.exitCode = 1
    continue
  }

  await writeFile(file, src)
  console.log(`rewrote ${rel}`)
}

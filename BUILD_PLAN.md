# Silver Dragon Squadron: WordPress to Nuxt Build Plan

This repo is a starter scaffold for rebuilding https://silverdragonsquadron.com
as a static Nuxt 4 site. The shell, routing, content model, and all extracted
content are in place and the site builds. What remains is finishing content,
matching the exact look, and deploying.

## Decisions locked in

- Framework: Nuxt 4, static generation (`nuxt generate` to `/dist`).
- Scope: read-only visual site. No blog, no comments, no forms, no backend.
- Content: hardcoded in `app/data/*.ts`. No CMS.
- Styling: Tailwind v4 (via the `@tailwindcss/vite` plugin) with design tokens
  in `app/assets/css/main.css`.
- Images: uploaded Cloudinary assets (`sds/<project-slug>/<filename>`),
  rendered with `@nuxt/image`'s `<NuxtImg>`. No WordPress dependency.
- Hosting: GitHub repo, deployed by Netlify (`netlify.toml` included).
- Goal: faithful rebuild of the current look and behavior.

## Run it

```bash
npm install
npm run dev        # local dev at http://localhost:3000
npm run generate   # static build into /dist
npx serve dist     # preview the static output
```

Set the Cloudinary cloud name before image optimization kicks in:

```bash
cp .env.example .env
# edit NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME
```

Until that is set, images fall back to the original source URLs untouched.

## Repo map

```
app/
  app.vue                      root
  layouts/default.vue          header + slide nav + footer
  pages/
    index.vue                  home (hero, portfolio preview, about cards)
    sample-page.vue            "Piece By Piece" portfolio index + category filter
    project/[slug].vue         project gallery + prev/next nav
    about-steve-kim.vue
    about-the-plane.vue
    what-this-project-means-to-steve.vue
  components/                  AppHeader, SlideNav, AppFooter, ProjectCard,
                               ProjectGallery, Lightbox, PortfolioFilter
  composables/                 useCloudinary, useNav
  data/                        site.ts, pages.ts, projects.ts   <-- all content
  assets/css/main.css          Tailwind entry + design tokens
nuxt.config.ts
netlify.toml
```

## Remaining work, in order

### 1. Finish the project galleries

`app/data/projects.ts` has all 15 projects with covers and filter categories.
Two galleries are fully populated (`90-complete`, `parachute`). The other 13
have `gallery: []` with a TODO.

For each remaining slug, open the live page (for example
`https://silverdragonsquadron.com/project/canopy/`), collect every gallery
image, and add `{ src }` entries. Use the full-resolution upload URL, not the
`-320x240` or `-225x300` thumbnail. The composable handles resizing.

Three projects were renamed from their old WordPress demo slugs to clean ones,
with 301 redirects already added in `netlify.toml`:

- `example-project-4` -> `flight-controls`
- `example-project-3` -> `avionics`
- `example_one` -> `fuselage`

When crawling those galleries, fetch the OLD live URLs (the demo slugs above),
since that is where the images still live on WordPress.

Confirm each project's `categories` against the live filter bar so the
"Piece By Piece" filter matches the original behavior.

### 2. Match the visual design

The current tokens in `app/assets/css/main.css` are a reasonable aviation theme,
not the exact values from the live WordPress theme (`portthemetrust`). To make
the rebuild faithful:

- Open the live site, inspect computed styles, and capture the real background
  colors, text colors, accent/link color, heading and body font families, and
  the hero treatment. Drop those into the `@theme` block.
- The live fonts load from the theme. Add the matching Google Fonts (or self
  host) and update `--font-display` / `--font-body`.
- Compare the home hero, the portfolio grid card style, and the footer quote bar
  side by side and adjust spacing.

Take screenshots of each live page first so you have a reference to diff against.

### 3. Cloudinary

DONE (2026-09-11). All 216 images were uploaded into the Cloudinary account as
`sds/<project-slug>/<filename>` by `scripts/migrate-images.ts`, which also
backed up every original to the external drive
(`.../Silver Dragon Squadron/images/cloudinary_migration/<slug>/`).
`scripts/rewrite-data.ts` swapped the WordPress URLs in `app/data/` for public
IDs, rendering moved from `useCloudinary()` (deleted) to `@nuxt/image`'s
`<NuxtImg>` with the Cloudinary provider, and the WordPress dependency is gone.
The design doc is at `docs/superpowers/specs/2026-09-11-cloudinary-migration-design.md`.

### 4. Deploy

1. Push this repo to GitHub.
2. In Netlify: New site from Git, pick the repo. Detection should read
   `netlify.toml` (build `npm run generate`, publish `dist`).
3. Add the env var `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in Netlify site settings.
4. Deploy. Verify all 15 project pages, the filter, and the slide nav.

### 5. Domain and redirects

Point `silverdragonsquadron.com` DNS at Netlify and enable HTTPS. The starter
`netlify.toml` already redirects the renamed project slugs and forwards old
blog/category/wp-admin URLs to the home page. Add any other old WordPress URLs
that have inbound links or search ranking.

## Notes

- `crawlLinks` is on, so any page reachable by a link from `/` is prerendered.
  If you add a page with no inbound link, add it to `nitro.prerender.routes`.
- `app/data/*.ts` is the only place to edit content. Keep components content free.
- The slide nav, lightbox, and filter are plain Vue state, no jQuery.

# Silver Dragon Squadron

A static [Nuxt 4](https://nuxt.com) rebuild of silverdragonsquadron.com, the
homebuilt aircraft project site for Steve Kim's Falcon-XP. Read-only visual site:
no blog, comments, or backend.

## Quickstart

```bash
npm install
cp .env.example .env   # set your Cloudinary cloud name
npm run dev            # http://localhost:3000
```

## Build

```bash
npm run generate       # static output in /dist
npx serve dist         # preview
```

## Deploy

Push to GitHub and connect the repo to Netlify. The included `netlify.toml`
sets the build command (`npm run generate`) and publish directory (`dist`).
Add `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME` as an environment variable in Netlify.

## Editing content

All content is hardcoded in `app/data/`:

- `site.ts` nav, hero, footer
- `pages.ts` the three text pages
- `projects.ts` the 15 portfolio projects

See `BUILD_PLAN.md` for the full plan and remaining tasks, and `CLAUDE.md`
for working conventions.

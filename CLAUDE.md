# CLAUDE.md

Project rules for working in this repo with Claude Code.

## What this is

A static Nuxt 4 rebuild of the Silver Dragon Squadron WordPress site
(an aviation homebuild project site for Steve Kim's Falcon-XP). It is a
read-only visual site: no blog, no comments, no forms, no backend. The goal is
a faithful reproduction of the original look and behavior. Full background and
the task list live in `BUILD_PLAN.md`. Read it before starting work.

## Stack

- Nuxt 4 (Vue 3, `<script setup>`, TypeScript)
- Tailwind v4 via `@tailwindcss/vite`, tokens in `app/assets/css/main.css`
- Static generation only (`nuxt generate`), deployed on Netlify
- Cloudinary for image delivery (`app/composables/useCloudinary.ts`)

## Where things live

- All content is hardcoded in `app/data/`: `site.ts`, `pages.ts`, `projects.ts`.
  This is the single source of truth.
- Components must stay content free. Pull copy and data from `app/data`.
- Components auto-import from `app/components`; composables from
  `app/composables`. Do not add manual imports for those.

## Conventions

- Use Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
- Keep components small and single purpose.
- Match the existing token names (`bg-ink`, `text-silver`, `text-sky`, etc.)
  rather than hardcoding hex values in markup.
- Verify a build with `npm run generate` before considering a task done.

## Do not

- Do not commit directly to `master`/`main`. Work on a branch and open a PR.
- Do not add a blog, comments, contact forms, or any other interactive/backend
  feature. This site is read-only by design.
- Do not introduce a CMS, server routes, or runtime data fetching.
- Do not edit anything in `.nuxt`, `.output`, or `dist` (all generated).
- Do not add jQuery or other DOM libraries. Interactions use Vue state.

## Common tasks

- Add or fix a project: edit `app/data/projects.ts`.
- Adjust the look: edit tokens in `app/assets/css/main.css`.
- Preserve an old URL: add a redirect in `netlify.toml`.

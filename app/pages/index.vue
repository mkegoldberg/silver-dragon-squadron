<template>
  <div>
    <!-- Hero: full viewport, runway + dragon emblem, parallax background. -->
    <section
      class="relative flex min-h-screen items-center justify-center bg-scroll bg-cover bg-center md:bg-fixed"
      style="background-image: url('/hero-runway.png')"
    >
      <div class="absolute inset-0 bg-black/15" />
      <div class="relative px-4 text-center">
        <h1 class="font-display uppercase tracking-wider text-3xl sm:text-6xl text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.75)]">
          {{ site.hero.eyebrow }}
        </h1>
        <p class="mt-4 tracking-wide text-white/90 text-el sm:text-2xl [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">{{ site.hero.subtitle }}</p>
      </div>
    </section>

    <!-- Piece By Piece preview -->
    <section class="bg-white">
      <div class="mx-auto max-w-6xl px-4 py-16">
        <div class="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div class="text-center sm:text-left">
            <h2 class="font-display uppercase tracking-wide text-3xl text-silver font-semibold">Piece By Piece</h2>
            <p class="text-silver-dim mt-1">View each piece of the project</p>
          </div>
          <NuxtLink
            to="/sample-page"
            class="inline-block border border-sky px-5 py-2 text-sm uppercase tracking-wide text-sky transition hover:bg-sky hover:text-white"
          >
            View All
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
        </div>
      </div>
    </section>

    <!-- An Aviator's Vision: blueprint photo with parallax + dark overlay. -->
    <section
      class="relative bg-scroll bg-cover bg-center md:bg-fixed"
      style="background-image: url('/vision-blueprints.jpg')"
    >
      <div class="absolute inset-0 bg-black/50" />
      <div class="relative mx-auto max-w-6xl px-4 py-40">
        <div class="mb-12 text-center">
          <h2 class="font-display uppercase tracking-wide text-4xl text-white">An Aviator's Vision</h2>
          <p class="mt-1 text-white/60">A little about this project</p>
        </div>

        <div class="grid gap-10 md:grid-cols-3">
          <NuxtLink
            v-for="card in aboutCards"
            :key="card.to"
            :to="card.to"
            class="group block text-center md:text-left"
          >
            <h3 class="font-medium font-display uppercase text-sm tracking-wide text-white transition group-hover:text-sky">
              {{ card.title }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-white/70 line-clamp-6">{{ card.excerpt }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- From the Blog: white placeholder (blog removed; client will supply a replacement). -->
    <section class="bg-white">
      <div class="mx-auto max-w-3xl px-4 py-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.4 48.9" class="fill-lagoon">
          <path d="M186.6 37.6c-4.9 1.6-9.2.1-13.6-1.7-9-3.7-18-7.4-27.2-10.7-3.4-1.3-3.6-3-1.6-5.3 1.1-1.2 2.9-2 4.6-2.4 3-.7 6-.9 9-1.3-5.7-4.4-9.9-11-18.6-8.9 1.3 2.7 2.4 4.9 3.8 8-3.8.4-6.9.9-10 .9-30.3.1-60.6 0-90.9.3-10.4 0-19.6-1.7-26.2-10.6-.7-1-1.8-1.6-2.7-2.4C8.7-.8 6-1.1 0 2.3c1.9 3.9 3.6 8 5.8 11.7.9 1.5 3.1 3 4.8 3.1 7.9.5 15.7.4 23.6.6 16 .3 32 .8 48 .9 4.8 0 8.9 1 13 3.4 3.1 1.8 4.1 3.3 1.1 6.1-1.1 1-1.7 1.7-2.6 3.5 1.4-.2 2.4-.9 3.1-1.5 5.8-5.3 7.5-4.6 11.8 2.3 1.3 2.2 3.3 3.9 5 5.8 1.1 1.3 2.3 2.6 3.5 3.9-.2.4-.4.9-.7 1.3-1.8 0-3.6-.4-5.3-.2-.9.1-1.6 1.3-2.3 1.9 1.9 1 3.7 2.5 5.8 2.9 1.3.3 3.9-.9 4.1-1.8.7-3.3 2.4-2.8 4.7-2.2 14 3.7 28.3 5.1 42.5 2.6 9.3-1.7 18.2-5.6 27.3-8.5.1 0 .1-.4.2-.7-2.3 0-4.8-.6-6.8.1ZM140.4 7.7c-.8 0 2.4-.8 3.9 0 0 0 3.2.8 6.3 3.2 3 2.3 3.2 3.8 3.8 3.9.1 0 .2 0 0 0-1-.1-8.7-.7-9.4 0s-3.9-7.1-4.7-7.1ZM14.3 16.2c-1.6 0-3.9 0-5.5-1.5C6.4 12.3 3.3 2.9 3.3 2.9 4.9 2.1 6.5.5 8.8 1.3c1.7.6 3.2 2.4 3.9 3.2s3.9 5.5 4.7 6.3 4.7 3.1 7.1 3.9 5.5 1.5 7.1 1.5zm126.5 2.3c-.6 5.8-3.9 6.4-10.4 1.5 3.4-.5 6.8-1 10.4-1.5m18.5 20.7c-8.7.8-27.6-4.7-31.5-8.7-3.9-3.9 5.5-5.5 7.1-6.3 0 0 4.7-.8 7.1 0 3.8 1.3 29.2 11 29.2 11.8s-3.2 2.4-11.8 3.2Z"/>
          <text font-family="GoudyOldSty-Bol, 'Goudy Old Style'" font-size="13.6" transform="translate(29.3 13)"><tspan x="0" y="0">SILVER</tspan></text>
          <text font-family="GoudyOldSty-Bol, 'Goudy Old Style'" font-size="13.6" transform="translate(76.5 13)"><tspan x="0" y="0">DRAGON</tspan></text>
          <text font-family="GoudyOldSty-Bol, 'Goudy Old Style'" font-size="13.6" transform="translate(12 30.8)"><tspan x="0" y="0">SQUADRON</tspan></text>
          <path d="M181.3 48.2c-2.7.2-5.4.4-8.8.7 2.5-3.7 5.3-4 8.7-1.8 0 .4 0 .8.1 1.2Z"/>
        </svg>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { site } from '~/data/site'
import { projects } from '~/data/projects'
import { aboutSteveKim, aboutThePlane, whatThisProjectMeans } from '~/data/pages'

const aboutCards = [
  {
    title: aboutSteveKim.heading,
    to: '/about-steve',
    excerpt: aboutSteveKim.timeline.slice(0, 6).map((e) => e.text).join(' '),
  },
  {
    title: aboutThePlane.title,
    to: '/about-the-plane',
    excerpt: aboutThePlane.sections
      .slice(0, 3)
      .flatMap((s) => [...s.rows.map((r) => `${r.label} ${r.value}`), ...(s.postNote ? [s.postNote] : [])])
      .join(' '),
  },
  {
    title: whatThisProjectMeans.title,
    to: '/what-this-project-means-to-steve',
    excerpt: whatThisProjectMeans.body,
  },
]

useHead({ title: 'Silver Dragon Squadron' })
</script>

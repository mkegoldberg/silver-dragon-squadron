<template>
  <div class="mx-auto max-w-3xl px-4 py-12">
    <!-- Header: framed photo top-left, title and name beside it. -->
    <header class="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center">
      <!-- Face-aware square crop for a clean circle (matches the portrait crops). -->
      <NuxtImg
        v-reveal="'fadeIn'"
        :src="aboutSteveKim.photo"
        :alt="`${aboutSteveKim.heading}, builder of the Falcon-XP`"
        width="400"
        height="400"
        fit="fill"
        :modifiers="{ gravity: 'auto' }"
        class="aspect-square w-36 shrink-0 rounded-full border border-steel bg-ink-soft object-cover"
      />
      <div>
        <h1 class="font-display uppercase tracking-wide text-3xl text-silver">{{ aboutSteveKim.title }}</h1>
        <h2 class="font-display text-xl text-sky mt-2">{{ aboutSteveKim.heading }}</h2>
      </div>
    </header>

    <Timeline :items="aboutSteveKim.timeline" />
  </div>
</template>

<script setup lang="ts">
import { aboutSteveKim } from '~/data/pages'

useHead({ title: `${aboutSteveKim.title} | Silver Dragon Squadron` })
</script>

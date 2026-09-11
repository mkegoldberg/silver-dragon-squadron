<template>
  <div class="mx-auto max-w-3xl px-4 py-12">
    <h1 class="font-display uppercase tracking-wide text-3xl text-silver mb-8">
      {{ whatThisProjectMeans.title }}
    </h1>
    <SteveQuote />
  </div>
</template>

<script setup lang="ts">
import { whatThisProjectMeans } from '~/data/pages'
useHead({ title: `${whatThisProjectMeans.title} | Silver Dragon Squadron` })
</script>

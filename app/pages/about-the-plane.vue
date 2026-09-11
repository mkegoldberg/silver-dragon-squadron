<template>
  <div class="mx-auto max-w-3xl px-4 py-12">
    <h1 class="font-display uppercase tracking-wide text-3xl text-silver mb-8">{{ aboutThePlane.title }}</h1>

    <section v-for="(s, i) in aboutThePlane.sections" :key="i" class="mb-8">
      <h2 class="font-display text-lg text-sky">{{ s.heading }}</h2>
      <p v-if="s.note" class="text-xs text-silver-dim italic mb-2">{{ s.note }}</p>
      <dl class="border-y border-steel divide-y divide-steel">
        <div
          v-for="(row, j) in s.rows"
          :key="j"
          class="flex items-baseline justify-between gap-6 py-2.5 leading-relaxed"
        >
          <dt class="text-silver-dim">{{ row.label }}</dt>
          <dd class="text-silver text-right">{{ row.value }}</dd>
        </div>
      </dl>
      <p v-if="s.postNote" class="text-xs text-silver-dim italic mt-2">{{ s.postNote }}</p>
    </section>

    <p class="mt-8 font-semibold text-silver">{{ aboutThePlane.footnote }}</p>
  </div>
</template>

<script setup lang="ts">
import { aboutThePlane } from '~/data/pages'
useHead({ title: `${aboutThePlane.title} | Silver Dragon Squadron` })
</script>

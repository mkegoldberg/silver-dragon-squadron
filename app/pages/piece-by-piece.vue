<template>
  <div class="mx-auto max-w-6xl px-4 py-12">
    <h1 class="font-display uppercase tracking-wide text-3xl text-silver mb-8">Piece By Piece</h1>

    <PortfolioFilter
      :categories="projectCategories"
      :active="active"
      @update:active="active = $event"
    />

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProjectCard v-for="p in filtered" :key="p.slug" :project="p" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { projects, projectCategories } from '~/data/projects'

const active = ref('All')
const filtered = computed(() =>
  active.value === 'All'
    ? projects
    : projects.filter((p) => p.categories.includes(active.value)),
)

useHead({ title: 'Piece By Piece | Silver Dragon Squadron' })
</script>

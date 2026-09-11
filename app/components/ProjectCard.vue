<template>
  <NuxtLink
    :to="`/project/${project.slug}`"
    class="group relative block aspect-[4/3] overflow-hidden rounded-card border border-steel bg-ink-soft"
  >
    <!-- 320x240 fill crop, matching the live portfolio cover thumbnails. -->
    <NuxtImg
      :src="project.cover"
      :alt="project.title"
      width="320"
      height="240"
      fit="fill"
      :modifiers="{ gravity: 'auto' }"
      loading="lazy"
      class="h-full w-full object-cover transition duration-500 group-hover:grayscale"
    />

    <!-- Hover: desaturated light wash + title in a bordered box (matches the live portfolio). -->
    <div
      class="absolute inset-0 flex items-center justify-center bg-sky/0 opacity-0 transition duration-300 group-hover:bg-sky/90 group-hover:opacity-100"
    >
      <span class="border-2 border-white/70 px-4 py-2 text-center text font-semibold text-white">
        {{ project.title }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Project } from '~/data/projects'

defineProps<{ project: Project }>()
</script>

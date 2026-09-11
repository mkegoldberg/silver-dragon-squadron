<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <figure v-for="(img, i) in images" :key="img.src" class="text-center">
        <!-- Square face-aware crop for a clean circle; CSS rounds it. -->
        <NuxtImg
          v-reveal="effectFor(i)"
          :src="img.src"
          :alt="img.alt || img.caption || ''"
          width="480"
          height="480"
          fit="fill"
          :modifiers="{ gravity: 'auto' }"
          class="mx-auto aspect-square w-full max-w-64 object-cover rounded-full border border-steel bg-ink-soft"
        />
        <figcaption v-if="img.caption" class="mt-4 text-silver-dim text-sm">
          {{ img.caption }}
        </figcaption>
      </figure>
    </div>

    <div class="mx-auto max-w-3xl mt-12">
      <SteveQuote />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectImage } from '~/data/projects'

const props = defineProps<{ images: ProjectImage[] }>()

// Outer photos rise in from below; the middle photo drops in from above.
function effectFor(i: number): string {
  const middle = Math.floor(props.images.length / 2)
  return i === middle ? 'bounceInDown' : 'bounceInUp'
}
</script>

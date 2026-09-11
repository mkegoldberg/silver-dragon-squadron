<template>
  <div>
    <div
      v-if="images.length"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-x-clip"
    >
      <button
        v-for="(img, i) in images"
        :key="img.src"
        :ref="(el) => setItemRef(el, i)"
        type="button"
        class="block aspect-[3/4] overflow-hidden bg-ink-soft border border-steel rounded-card"
        @click="openAt(i)"
      >
        <!-- Capped at 1200px (c_limit) so big originals are not shipped full size. -->
        <NuxtImg
          :src="img.src"
          :alt="img.alt || ''"
          width="1200"
          fit="coverLimit"
          loading="lazy"
          class="h-full w-full object-cover hover:opacity-90"
        />
      </button>
    </div>

    <p v-else class="text-silver-dim italic">Photos coming soon.</p>

    <Lightbox
      :open="lightboxOpen"
      :src="current ? fullSize(current.src) : undefined"
      :alt="current?.alt"
      @close="lightboxOpen = false"
      @prev="step(-1)"
      @next="step(1)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { ProjectImage } from '~/data/projects'

const props = defineProps<{ images: ProjectImage[] }>()
const img = useImage()
const { reveal } = useScrollReveal()

// Lightbox needs a URL string rather than an <img>; same 1200px cap as the grid.
function fullSize(src: string): string {
  return img(src, { width: 1200, fit: 'coverLimit' })
}

const lightboxOpen = ref(false)
const index = ref(0)
const current = computed(() => props.images[index.value])

function openAt(i: number) {
  index.value = i
  lightboxOpen.value = true
}
function step(dir: number) {
  const n = props.images.length
  if (!n) return
  index.value = (index.value + dir + n) % n
}

// Collect each grid item so we can group them into visual rows after layout.
// Relies on a static `images` prop (true on a project page): refs are set once
// and grouped in onMounted. If `images` ever became dynamic, this would need a
// reset + re-run (e.g. via a watch).
const itemEls: HTMLElement[] = []
function setItemRef(el: Element | ComponentPublicInstance | null, i: number) {
  if (el) itemEls[i] = el as HTMLElement
}

onMounted(() => {
  // Group items by shared top edge -> visual rows (correct at any column count).
  const rows = new Map<number, HTMLElement[]>()
  for (const el of itemEls) {
    if (!el) continue
    const top = el.offsetTop
    const bucket = rows.get(top) ?? []
    bucket.push(el)
    rows.set(top, bucket)
  }
  // Alternate slide direction per row: row 0 from the left, row 1 from the
  // right, and so on. Each row reveals as it scrolls into view.
  const tops = [...rows.keys()].sort((a, b) => a - b)
  tops.forEach((top, rowIndex) => {
    const effect = rowIndex % 2 === 0 ? 'slideInLeft' : 'slideInRight'
    for (const el of rows.get(top)!) reveal(el, effect)
  })
})
</script>

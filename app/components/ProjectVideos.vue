<template>
  <div>
    <div
      :class="
        variant === 'centered'
          ? 'mx-auto max-w-2xl space-y-8'
          : 'grid gap-8 sm:grid-cols-2'
      "
    >
      <div
        v-for="(video, i) in videos"
        :key="video.id"
        :ref="(el) => setItemRef(el, i)"
      >
        <h2
          class="mb-3 text-2xl text-silver"
          :class="variant === 'centered' ? 'text-center' : ''"
        >
          {{ video.title }}
        </h2>
        <button
          type="button"
          class="group relative block aspect-video w-full overflow-hidden rounded-card border border-steel bg-ink-soft"
          :aria-label="`Play video: ${video.title}`"
          @click="openAt(i)"
        >
          <img
            :src="thumbUrl(video.id)"
            :alt="video.title"
            loading="lazy"
            class="h-full w-full object-cover group-hover:opacity-90"
          />
          <span class="absolute inset-0 flex items-center justify-center">
            <span
              class="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white transition-colors duration-200 group-hover:bg-sky"
            >
              <svg
                class="h-7 w-7 translate-x-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="current"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          @click.self="close"
        >
          <button
            type="button"
            aria-label="Close"
            class="absolute top-4 right-4 text-white/80 hover:text-white"
            @click="close"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>

          <div class="w-full max-w-4xl">
            <p class="mb-3 text-lg text-white/90">{{ current.title }}</p>
            <div class="aspect-video">
              <iframe
                :src="`https://www.youtube.com/embed/${current.id}?autoplay=1`"
                :title="current.title"
                class="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { ProjectVideo } from '~/data/projects'

const props = defineProps<{
  videos: ProjectVideo[]
  /**
   * 'grid' (default) = 2-up rows (The Move's Videos tab).
   * 'centered' = single centered column (the Engine page's feature video).
   */
  variant?: 'grid' | 'centered'
}>()
const { reveal } = useScrollReveal()

// hqdefault always exists (maxresdefault does not for older uploads); it is
// 4:3 letterboxed, and object-cover in the 16:9 button crops the bars away.
function thumbUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

const openIndex = ref(-1)
const current = computed(() => props.videos[openIndex.value])

function openAt(i: number) {
  openIndex.value = i
}
function close() {
  openIndex.value = -1
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}
watch(openIndex, (v) => {
  if (!import.meta.client) return
  if (v >= 0) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  if (import.meta.client) window.removeEventListener('keydown', onKey)
})

// Reveal effects match the original pages: the grid's first row slides in
// from the left and every later row from the right (The Move renders
// L,L,R,R,R), while the centered feature video flips in (Engine page).
// The reveal only runs on desktop (>=768px) where the grid is always 2-up,
// so row = floor(i / 2).
const itemEls: HTMLElement[] = []
function setItemRef(el: Element | ComponentPublicInstance | null, i: number) {
  if (el) itemEls[i] = el as HTMLElement
}
onMounted(() => {
  itemEls.forEach((el, i) => {
    if (!el) return
    const effect =
      props.variant === 'centered'
        ? 'flipInY'
        : Math.floor(i / 2) === 0
          ? 'fadeInLeft'
          : 'fadeInRight'
    reveal(el, effect)
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

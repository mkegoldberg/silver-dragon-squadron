<template>
  <div>
    <div
      class="relative z-10 -mb-px flex flex-wrap gap-px"
      role="tablist"
      aria-label="Gallery sections"
      @keydown="onKeydown"
    >
      <button
        v-for="(tab, i) in tabs"
        :key="tab.label"
        :ref="(el) => setTabRef(el, i)"
        :id="`${uid}-tab-${i}`"
        type="button"
        role="tab"
        :aria-selected="i === active"
        :aria-controls="`${uid}-panel`"
        :tabindex="i === active ? 0 : -1"
        class="inline-flex items-center rounded-t-tab border px-5 py-3.5 transition-colors duration-200"
        :class="tabClass(i)"
        @click="active = i"
      >
        <svg
          class="h-[1.15em] w-[1.15em] shrink-0"
          :viewBox="icons[tab.icon].viewBox"
          fill="currentColor"
          aria-hidden="true"
        >
          <path :d="icons[tab.icon].path" />
        </svg>
        <span class="ml-3.5">{{ tab.label }}</span>
      </button>
    </div>

    <div
      v-if="current"
      :id="`${uid}-panel`"
      role="tabpanel"
      :aria-labelledby="`${uid}-tab-${active}`"
      class="rounded-b-tab rounded-tr-tab border border-steel bg-ink-soft px-5 py-3.5"
    >
      <ProjectGallery
        v-if="current.images?.length || !current.videos?.length"
        :key="current.label"
        :images="current.images ?? []"
      />
      <ProjectVideos
        v-if="current.videos?.length"
        :key="`${current.label}-videos`"
        :videos="current.videos"
        :class="current.images?.length ? 'mt-8' : ''"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { ProjectTab, ProjectTabIcon } from '~/data/projects'

const props = defineProps<{
  tabs: ProjectTab[]
  /** Color scheme of the tab bar, from the original page's WPBakery setting. */
  color?: 'grey' | 'turquoise'
}>()

const uid = useId()
const active = ref(0)
const current = computed(() => props.tabs[active.value])

// Roving tabindex + arrow-key navigation (ARIA tabs pattern; selection
// follows focus).
const tabEls: HTMLElement[] = []
function setTabRef(el: Element | ComponentPublicInstance | null, i: number) {
  if (el) tabEls[i] = el as HTMLElement
}
function onKeydown(e: KeyboardEvent) {
  const n = props.tabs.length
  let next: number | null = null
  if (e.key === 'ArrowRight') next = (active.value + 1) % n
  else if (e.key === 'ArrowLeft') next = (active.value - 1 + n) % n
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = n - 1
  if (next === null) return
  e.preventDefault()
  active.value = next
  tabEls[next]?.focus()
}

function tabClass(i: number) {
  // Active tab shares the panel's background and drops its bottom border so
  // it fuses with the panel below (classic folder-tab look, as on the live site).
  if (i === active.value)
    return 'bg-ink-soft border-steel border-b-transparent text-silver-dim cursor-default'
  return 'bg-sky border-sky-strong text-white hover:bg-sky-strong'
}

// Icon paths from Font Awesome Free 5.15.4 (CC BY 4.0) — the icon set the
// original theme renders these tabs with (fa-camera, fa-plane, fa-rebel,
// fa-wrench, fa-video-camera).
const icons: Record<ProjectTabIcon, { viewBox: string; path: string }> = {
  camera: {
    viewBox: '0 0 512 512',
    path: 'M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z',
  },
  plane: {
    viewBox: '0 0 576 512',
    path: 'M480 192H365.71L260.61 8.06A16.014 16.014 0 0 0 246.71 0h-65.5c-10.63 0-18.3 10.17-15.38 20.39L214.86 192H112l-43.2-57.6c-3.02-4.03-7.77-6.4-12.8-6.4H16.01C5.6 128-2.04 137.78.49 147.88L32 256 .49 364.12C-2.04 374.22 5.6 384 16.01 384H56c5.04 0 9.78-2.37 12.8-6.4L112 320h102.86l-49.03 171.6c-2.92 10.22 4.75 20.4 15.38 20.4h65.5c5.74 0 11.04-3.08 13.89-8.06L365.71 320H480c35.35 0 96-28.65 96-64s-60.65-64-96-64z',
  },
  rebel: {
    viewBox: '0 0 512 512',
    path: 'M256.5 504C117.2 504 9 387.8 13.2 249.9 16 170.7 56.4 97.7 129.7 49.5c.3 0 1.9-.6 1.1.8-5.8 5.5-111.3 129.8-14.1 226.4 49.8 49.5 90 2.5 90 2.5 38.5-50.1-.6-125.9-.6-125.9-10-24.9-45.7-40.1-45.7-40.1l28.8-31.8c24.4 10.5 43.2 38.7 43.2 38.7.8-29.6-21.9-61.4-21.9-61.4L255.1 8l44.3 50.1c-20.5 28.8-21.9 62.6-21.9 62.6 13.8-23 43.5-39.3 43.5-39.3l28.5 31.8c-27.4 8.9-45.4 39.9-45.4 39.9-15.8 28.5-27.1 89.4.6 127.3 32.4 44.6 87.7-2.8 87.7-2.8 102.7-91.9-10.5-225-10.5-225-6.1-5.5.8-2.8.8-2.8 50.1 36.5 114.6 84.4 116.2 204.8C500.9 400.2 399 504 256.5 504z',
  },
  wrench: {
    viewBox: '0 0 512 512',
    path: 'M507.73 109.1c-2.24-9.03-13.54-12.09-20.12-5.51l-74.36 74.36-67.88-11.31-11.31-67.88 74.36-74.36c6.62-6.62 3.43-17.9-5.66-20.16-47.38-11.74-99.55.91-136.58 37.93-39.64 39.64-50.55 97.1-34.05 147.2L18.74 402.76c-24.99 24.99-24.99 65.51 0 90.5 24.99 24.99 65.51 24.99 90.5 0l213.21-213.21c50.12 16.71 107.47 5.68 147.37-34.22 37.07-37.07 49.7-89.32 37.91-136.73zM64 472c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z',
  },
  video: {
    viewBox: '0 0 576 512',
    path: 'M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z',
  },
}
</script>

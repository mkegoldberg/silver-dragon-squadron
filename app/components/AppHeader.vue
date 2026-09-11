<template>
  <header
    class="fixed inset-x-0 top-0 z-30 transition-colors duration-300 border-b"
    :class="solid ? 'bg-sky/95 backdrop-blur border-white/10' : 'bg-transparent border-transparent'"
  >
    <div class="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
      <NuxtLink to="/" :aria-label="`${site.name} — home`" class="flex items-center">
        <img src="/logo.png" :alt="site.name" width="200" height="54" class="h-10 w-auto sm:h-12" />
      </NuxtLink>

      <button
        type="button"
        aria-label="Open navigation"
        class="p-2 text-white/90 hover:text-white transition"
        @click="open"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { site } from '~/data/site'

const { open } = useNav()
const route = useRoute()
const scrolled = ref(false)

// Transparent over the hero at the top of the home page; solid (dark) once the
// user scrolls or on any inner page, so the white logo stays legible.
const solid = computed(() => scrolled.value || route.path !== '/')

function onScroll() {
  scrolled.value = window.scrollY > 60
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

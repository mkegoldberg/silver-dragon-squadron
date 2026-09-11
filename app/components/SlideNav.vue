<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-black/60"
        @click="close"
      />
    </Transition>

    <!-- Panel -->
    <Transition name="slide-nav">
      <nav
        v-if="isOpen"
        class="fixed right-0 top-0 z-50 h-full w-72 max-w-[80vw] bg-ink-soft border-l border-steel p-6"
        aria-label="Main"
      >
        <button
          type="button"
          aria-label="Close navigation"
          class="mb-8 text-silver-dim hover:text-silver"
          @click="close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>

        <ul class="space-y-4">
          <li v-for="item in nav" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="block uppercase text-sm tracking-wide text-silver hover:text-sky"
              @click="close"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nav } from '~/data/site'
const { isOpen, close } = useNav()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

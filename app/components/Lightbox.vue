<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        @click.self="$emit('close')"
      >
        <button
          type="button"
          aria-label="Close"
          class="absolute top-4 right-4 text-white/80 hover:text-white"
          @click="$emit('close')"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Previous"
          class="absolute left-4 text-white/80 hover:text-white text-4xl"
          @click="$emit('prev')"
        >
          &#8249;
        </button>

        <img
          v-if="src"
          :src="src"
          :alt="alt || ''"
          class="max-h-[85vh] max-w-[90vw] object-contain"
        />

        <button
          type="button"
          aria-label="Next"
          class="absolute right-4 text-white/80 hover:text-white text-4xl"
          @click="$emit('next')"
        >
          &#8250;
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ open: boolean; src?: string; alt?: string }>()
defineEmits<{ close: []; prev: []; next: [] }>()
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

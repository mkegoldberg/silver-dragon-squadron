<template>
  <ol class="relative ml-2 border-l border-steel">
    <li
      v-for="(item, i) in items"
      :key="i"
      v-reveal="{ effect: 'fadeInUp', delay: i * 80 }"
      class="relative pb-8 pl-8 last:pb-0"
    >
      <!-- Marker dot, centered on the rail and ringed in the page colour so it
           reads as sitting on top of the line. -->
      <span
        class="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-sky ring-4 ring-ink"
        aria-hidden="true"
      />
      <p class="font-display text-sm font-semibold uppercase tracking-wide text-sky">
        {{ item.date }}
      </p>
      <p class="mt-1 text-silver-dim leading-relaxed">{{ item.text }}</p>
    </li>
  </ol>
</template>

<script setup lang="ts">
// Content-free: events come from the page (app/data). `date` is the rail
// label, `text` the description.
defineProps<{ items: { date: string; text: string }[] }>()
</script>

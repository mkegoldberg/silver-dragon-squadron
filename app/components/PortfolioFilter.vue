<template>
  <ul class="flex flex-wrap gap-x-4 gap-y-2 mb-8 text-sm">
    <li>
      <button
        type="button"
        class="uppercase tracking-wide"
        :class="active === 'All' ? 'text-sky' : 'text-silver-dim hover:text-silver'"
        @click="$emit('update:active', 'All')"
      >
        All
      </button>
    </li>
    <li v-for="cat in categories" :key="cat">
      <button
        type="button"
        class="uppercase tracking-wide"
        :class="active === cat ? 'text-sky' : 'text-silver-dim hover:text-silver'"
        @click="$emit('update:active', cat)"
      >
        {{ cat }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ categories: string[]; active: string }>()
defineEmits<{ 'update:active': [value: string] }>()
</script>

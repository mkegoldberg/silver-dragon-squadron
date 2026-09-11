<template>
  <footer>
    <div
      class="relative bg-cover bg-center"
      style="background-image: url('/quote-cockpit.jpg')"
    >
      <div class="absolute inset-0 bg-black/50" />
      <div class="relative mx-auto max-w-4xl px-4 py-18 text-center">
        <p class="font-display text-lg italic text-white sm:text-xl">
          &ldquo;{{ site.quote.text }}&rdquo;
        </p>
        <p class="mt-3 text-sm text-white/70">- {{ site.quote.author }}</p>
      </div>
    </div>

    <!-- Copyright -->
    <div class="bg-ink py-10 flex justify-center">
      <div class="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-silver-dim border-t border-silver-dim/25">
        &copy; {{ year }}
        <NuxtLink to="/" class="font-semibold text-silver hover:text-sky">
          {{ site.name }}
        </NuxtLink>
        {{ site.footer.copyright }}
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { site } from '~/data/site'
const year = new Date().getFullYear()
</script>

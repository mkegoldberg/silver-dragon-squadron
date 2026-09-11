<template>
  <div class="min-h-screen flex flex-col bg-ink text-silver">
    <AppHeader />
    <SlideNav />

    <!-- The header is fixed/transparent over the home hero; inner pages need
         top padding so their content clears the fixed bar. -->
    <main class="flex-1" :class="{ 'pt-16': !isHome }">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// AppHeader, SlideNav, and AppFooter are auto-imported from app/components.
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

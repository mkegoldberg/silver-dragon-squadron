<template>
  <div class="mx-auto max-w-6xl px-4 py-12">
    <div v-if="project">
      <div class="flex items-center justify-between mb-8">
        <NuxtLink
          :to="`/project/${prev?.slug}`"
          class="inline-flex items-center gap-1 text-silver-dim hover:text-sky text-sm uppercase"
        >
          <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
          </svg>
          {{ prev?.title }}
        </NuxtLink>
        <NuxtLink
          to="/sample-page"
          class="inline-flex items-center text-silver-dim hover:text-sky"
          aria-label="All projects"
          title="All projects"
        >
          <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="3" y="3" width="4" height="4" rx="1" />
            <rect x="10" y="3" width="4" height="4" rx="1" />
            <rect x="17" y="3" width="4" height="4" rx="1" />
            <rect x="3" y="10" width="4" height="4" rx="1" />
            <rect x="10" y="10" width="4" height="4" rx="1" />
            <rect x="17" y="10" width="4" height="4" rx="1" />
            <rect x="3" y="17" width="4" height="4" rx="1" />
            <rect x="10" y="17" width="4" height="4" rx="1" />
            <rect x="17" y="17" width="4" height="4" rx="1" />
          </svg>
        </NuxtLink>
        <NuxtLink
          :to="`/project/${next?.slug}`"
          class="inline-flex items-center gap-1 text-silver-dim hover:text-sky text-sm uppercase"
        >
          {{ next?.title }}
          <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
          </svg>
        </NuxtLink>
      </div>

      <h1 class="font-display uppercase tracking-wide text-3xl text-silver mb-8">
        {{ project.title }}
      </h1>

      <p v-if="project.description" class="text-silver-dim mb-8 max-w-2xl">
        {{ project.description }}
      </p>

      <ProjectPortraits
        v-if="project.variant === 'portraits'"
        :images="project.gallery ?? []"
      />
      <ProjectTabs
        v-else-if="project.tabs"
        :tabs="project.tabs"
        :color="project.tabColor"
      />
      <ProjectGallery v-else :images="project.gallery ?? []" />

      <ProjectVideos
        v-if="project.videos?.length"
        :videos="project.videos"
        variant="centered"
        class="mt-10"
      />
    </div>

    <div v-else class="text-center py-24">
      <p class="text-silver-dim">Project not found.</p>
      <NuxtLink to="/sample-page" class="text-sky">Back to Piece By Piece</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProject, getAdjacentProjects } from '~/data/projects'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const project = computed(() => getProject(slug.value))
const { prev, next } = getAdjacentProjects(slug.value)

if (!project.value) {
  // Keeps the prerender + client happy for unknown slugs.
  showError({ statusCode: 404, statusMessage: 'Project not found' })
}

useHead(() => ({
  title: project.value
    ? `${project.value.title} | Silver Dragon Squadron`
    : 'Silver Dragon Squadron',
}))
</script>

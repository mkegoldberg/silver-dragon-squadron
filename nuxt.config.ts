import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxt/image'],

  // Images live in Cloudinary as uploaded assets (public IDs like
  // "sds/parachute/IMG_1294" in app/data). NuxtImg builds the delivery URLs.
  // The cloud name must be set at build time (.env locally, Netlify env in CI).
  image: {
    provider: 'cloudinary',
    cloudinary: {
      baseURL: `https://res.cloudinary.com/${process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''}/image/upload/`,
    },
  },

  // Fully static site. `nuxt generate` prerenders every route to /dist.
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      // failOnError keeps a broken link from silently shipping.
      failOnError: false,
    },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Silver Dragon Squadron',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'The homebuilt aircraft project of Steve Kim. Follow the Falcon-XP build piece by piece.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },

})

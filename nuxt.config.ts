export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  app: {
    head: {
      titleTemplate: '%s · Cinestack',
      meta: [
        { name: 'description', content: 'Découvrez les meilleurs films et séries du moment. Tendances, recommandations et fiches détaillées.' },
        { property: 'og:site_name', content: 'Cinestack' },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: 'Découvrez les meilleurs films et séries du moment. Tendances, recommandations et fiches détaillées.' },
        { property: 'og:image', content: 'https://cinestack-mgl.netlify.app/cinestack.svg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://cinestack-mgl.netlify.app/cinestack.svg' },
      ],
    },
  },
  css: [
    '~/assets/scss/reset.scss',
    '~/assets/scss/main.scss'
  ],
  nitro: {
    preset: 'netlify'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/foundations/index.scss" as *;
          `
        }
      }
    }
  },
  modules: ['@pinia/nuxt'],
  components: [
    { path: '~/components', pathPrefix: false }
  ],

  runtimeConfig: {
    tmdbToken: process.env.TMDB_TOKEN,
  }
})
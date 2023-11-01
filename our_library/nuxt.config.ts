export default defineNuxtConfig({
  modules: ["nuxt-quasar-ui", '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL + '/api/v1',
      baseWsUrl: process.env.BASE_WS_URL
    },
  },
  routeRules: {
    "/pages/Login.vue": { ssr: false },
  },
  devtools: {
    enabled: true,
  },
  components: [
    './layouts/global-components'
  ]
});
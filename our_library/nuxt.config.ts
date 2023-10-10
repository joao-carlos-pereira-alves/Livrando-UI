export default defineNuxtConfig({
  modules: ["nuxt-quasar-ui", '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL + '/api/v1' || "https://jsonplaceholder.typicode.com",
    },
  },
  devtools: {
    enabled: true,
  },
  components: [
    './layouts/global-components'
  ],
  ssr: false
});
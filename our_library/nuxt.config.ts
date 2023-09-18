export default defineNuxtConfig({
  modules: ["nuxt-quasar-ui"],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "https://jsonplaceholder.typicode.com",
    },
  },
  devtools: {
    enabled: true,
  },
});

<template>
  <q-layout
    view="lHh lpr lFf"
    container
    style="height: 100vh; background: #f5f1e3"
    class="shadow-2 rounded-borders"
  >
    <Navbar v-show="!$route.name.includes('Login')" v-if="!loadingDOM" />
    <q-page-container class="page-container">
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Navbar from "./layouts/Navbar.vue";
import { onMounted } from "vue";

const loadingDOM = ref(true);

onMounted(() => {
  loadingDOM.value = false;

  useMeta({
    title: "LIVRANDO",
  });
});
</script>

<style>
.page-container {
  margin: 0 10em 0 10em;
}

@media (max-width: 574px) {
  .page-container {
    margin: 0 2em 0 2em !important;
  }
}

.link {
  cursor: pointer;
}

.link:active {
  top: 1px;
  filter: brightness(85%);
}

.green-background {
  background-color: #badcc8;
}
</style>

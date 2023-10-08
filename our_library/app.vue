<template>
  <q-layout view="lHh lpr lFf" container style="height: 100vh; background: #F5F1E3;" class="shadow-2 rounded-borders">
    <Navbar v-show="!$route.name.includes('Login')" />
    <q-page-container class="page-container">
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Navbar from './layouts/Navbar.vue'
</script>

<style>
.page-container {
  margin: 0 10em 0 10em;
}

@media(max-width: 574px) {
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
</style>
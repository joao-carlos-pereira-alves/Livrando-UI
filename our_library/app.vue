<template>
  <q-layout view="lHh lpr lFf" container style="height: 400px" class="shadow-2 rounded-borders">
    <Navbar />
    <q-page-container>
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Navbar from './layouts/Navbar.vue'

</script>
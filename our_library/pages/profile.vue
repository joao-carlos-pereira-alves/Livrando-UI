<template>
  <q-page class="items-start text-black">
    <div class="row">
      <div
        class="col-12 text-center row justify-center"
        :class="{ 'q-my-lg q-pa-xl': loadingDOM }"
      >
        <q-skeleton type="rect" width="200px" v-if="loadingDOM" />
        <h3 class="text-red-10 text-weight-bold" v-else>Perfil</h3>
      </div>
      <div class="col-12 q-mb-md">
        <ProfileHeaderComponent />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ProfileHeaderComponent from "../layouts/profileHeaderComponent.vue";
import { ref, onMounted } from "vue";

const loadingDOM = ref(true);
const loadingBooks = ref(true);

onMounted(() => {
  loadingDOM.value = false;
});
</script>

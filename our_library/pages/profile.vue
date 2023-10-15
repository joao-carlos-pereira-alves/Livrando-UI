<template>
  <q-page class="text-black">
    <div class="row">
      <div
        class="col-12 text-center row justify-center"
        :class="{ 'q-my-lg q-pa-xl': loadingDOM }"
      >
        <q-skeleton type="rect" width="200px" v-if="loadingDOM" />
        <h3 class="text-red-10 text-weight-bold" v-else>Perfil</h3>
      </div>
      <div class="col-12 q-mb-lg">
        <ProfileHeaderComponent />
      </div>
      <div class="col-12 q-mb-md">
        <ProfileReviewComponent  />
      </div>
      <div class="col-12 col-sm-12 col-md-4">
        <ProfileNegociationComponent />
      </div>
      <div class="col-12 col-sm-12 col-md-8 q-mb-md" :class="{'q-pl-sm': !$q.screen.xs && !$q.screen.sm, 'q-mt-sm': $q.screen.xs || $q.screen.sm }">
        <ChatComponent />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ProfileReviewComponent from "../layouts/profileReviewComponent.vue";
import ProfileHeaderComponent from "../layouts/profileHeaderComponent.vue";
import ProfileNegociationComponent from "../layouts/profileNegociationComponent.vue";
import ChatComponent from "../layouts/chatComponent.vue";
import { ref, onMounted } from "vue";

const loadingDOM = ref(true);
const loadingBooks = ref(true);

onMounted(() => {
  loadingDOM.value = false;
});
</script>

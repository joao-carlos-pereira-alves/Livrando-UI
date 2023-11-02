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
        <q-skeleton type="rect" width="100%" height="150px" v-if="loadingDOM" />
        <ProfileHeaderComponent v-else />
      </div>
      <div class="col-12 q-mb-md">
        <q-skeleton type="rect" width="100%" height="75px" v-if="loadingDOM" />
        <ProfileReviewComponent v-else />
      </div>
      <div class="col-12 col-sm-12 col-md-4">
        <q-skeleton type="rect" class="q-mb-md q-pr-sm" width="100%" height="150px" v-if="loadingDOM" />
        <ProfileNegociationComponent v-else />
      </div>
      <div class="col-12 col-sm-12 col-md-8 q-mb-md" :class="{'q-pl-sm': !$q.screen.xs && !$q.screen.sm, 'q-mt-sm': ($q.screen.xs || $q.screen.sm) && !loadingDOM }">
        <q-skeleton type="rect" width="100%" height="150px" v-if="loadingDOM" />
        <ChatComponent v-else />
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

onMounted(() => {
  loadingDOM.value = false;
});
</script>

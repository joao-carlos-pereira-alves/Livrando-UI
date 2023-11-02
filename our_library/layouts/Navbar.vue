<template>
  <q-header elevated class="bg-grey-1 q-mb-none">
    <div class="row justify-between q-px-md q-pt-md items-center">
      <div class="col q-pb-sm">
        <q-skeleton
          type="QToolbar"
          style="height: 25px; max-width: 250px"
          v-if="loadingDOM"
        />
        <span class="toolbar-logo-title text-red-10" v-else>LIVRANDO</span>
      </div>
      <div class="col">
        <q-tabs no-caps class="text-black">
          <q-skeleton type="QBadge" v-if="loadingDOM" />
          <q-route-tab to="/" label="Home" v-else />
          <q-skeleton type="QBadge" v-if="loadingDOM" class="q-ml-md" />
          <q-route-tab to="/favorites" label="Favoritos" v-else />
          <q-skeleton type="QBadge" v-if="loadingDOM" />
        </q-tabs>
      </div>
      <div class="col row justify-end q-pb-sm items-center">
        <q-skeleton type="QAvatar" v-if="loadingDOM" />
        <q-avatar class="toolbar-actions" size="38px" v-else>
          <q-img
            :src="_auth?.avatar?.url ? baseUrl + _auth.avatar.url : NoImage"
            fit="contain"
          />
        </q-avatar>
        <q-skeleton
          class="col-2 q-ml-md"
          type="text"
          style="height: 25px; max-width: 250px"
          v-if="loadingDOM"
        />
        <q-btn
          class="toolbar-actions text-red-10"
          flat
          label="Perfil"
          v-else
          @click="
            $router.push({ path: '/profile', query: { uuid: _auth.uuid } })
          "
        />
        <q-skeleton class="q-ml-md" type="QBtn" v-if="loadingDOM" />
        <q-btn
          class="toolbar-actions text-red-10"
          outline
          label="Sair"
          v-else
          to="/login"
        />
      </div>
    </div>
  </q-header>
</template>

<script setup>
import { authentication } from "../store/modules/authentication";
import { ref, onMounted, computed, defineAsyncComponent  } from "vue";
import NoImage from "../public/images/user_not_found.png"

const loadingDOM = ref(true);
const useAuthentication = authentication();
const config = useRuntimeConfig();

const { logout } = useAuthentication;
const _auth = computed(() => useAuthentication._auth);
const baseUrl = config.public.baseURL.replace('/api/v1', '')

onMounted(() => {
  loadingDOM.value = false;
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Petrona:wght@500&family=Poppins:ital,wght@0,400;0,500;1,700&family=Roboto+Mono:wght@700&family=Roboto:wght@400;500;700&display=swap");

.toolbar {
  margin: 1em;
}

.toolbar-logo-title {
  text-align: center;
  justify-content: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  font-family: Petrona;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
}

.toolbar-content-links {
  justify-content: center;
  text-align: center;
}

.toolbar-link {
  color: #2f3a3b;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 0.5em;
}

.toolbar-link:hover {
  border-bottom: 2px solid #b71c1c;
}

.toolbar-actions {
  margin-left: 0.8em;
}
</style>

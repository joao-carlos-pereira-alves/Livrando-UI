<template>
  <q-card
    class="green-background shadow-0 q-pa-lg card"
    style="overflow-x: auto; max-height: 300px"
  >
    <BookNegociationComponent
      v-model:open="openNegociationComponent"
      :book="currentTrade?.book || {}"
      :trade="currentTrade"
      @trade="updateTrade"
      v-if="openNegociationComponent"
    />
    <q-card-section class="text-black text-weight-bold q-pa-none q-mb-sm">
      Negociações
    </q-card-section>
    <q-card-section
      class="row bg-white q-mb-sm"
      style="border-radius: 5px"
      v-for="trade in trades"
      :key="trade.id"
    >
      <div class="col-12 col-sm-12 col-md-4 col-lg-3">
        <q-img
          :src="
            getImageUrl(trade)
          "
          @error="getImageUrl(trade, true)"
          spinner-color="white"
          class="image full-height"
          style="height: 140px; max-width: 150px"
        />
      </div>
      <div
        class="col-12 col-sm-12 col-md-8 col-lg-9 row q-pa-md items-end justify-end"
      >
        <div class="col-12 text-weight-bold q-mb-md">
          {{ trade?.book?.title || "Não definido" }}
          <br />
          <span class="text-caption">
            By:
            {{ trade?.book?.author || "Desconhecido" }}
          </span>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
          <q-btn
            :style="trade.status == 'completed' ? 'background-color: green;' : 'background-color: #ffcc00'"
            class="full-width"
            :class="{ 'text-white': trade.status == 'completed' }"
            @click="setCurrentTrade(trade)"
            >
            {{ trade.status == 'completed' ? 'Finalizado' : 'Ver mais' }}</q-btn
          >
        </div>
        <div
          class="col-12 col-sm-12 col-md-12 col-lg-6 text-center"
          :class="{
            'q-pl-md': $q.screen.lg || $q.screen.xl,
            'q-mt-md': !$q.screen.lg || !$q.screen.xl,
          }"
          v-if="trade.book"
        >
          <q-rating
            v-model="trade.book.rating"
            size="1.8em"
            :max="5"
            color="yellow"
            disable
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import BookNegociationComponent from "../components/BookNegociationComponent.vue";
import { authentication } from "../store/modules/authentication";
import NoImage from "../public/images/no_image.png";

const config = useRuntimeConfig();
const baseUrl = config.public.baseURL.replace("/api/v1", "");
const trades = ref([]);
const currentTrade = ref(null);
const openNegociationComponent = ref(false);
const { _auth } = authentication();
const currentImageUrl = ref(null)

const getTrades = async () => {
  try {
    const { data, execute, status } = useApi("/trades", {
      method: "get",
    });

    await execute();

    if (status?.value == "success") {
      if (data.value) {
        trades.value = data.value;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const setCurrentTrade = (trade) => {
  currentTrade.value = trade;
  openNegociationComponent.value = true;
};

const updateTrade = (status) => {
  const trade = trades.value.find((e) => e.id == currentTrade.value.id)
  trade.status = status

  clearCurrentTrade();
}

const clearCurrentTrade = () => currentTrade.value = {};

const getImageUrl = (trade, error = false) => {
  if (trade?.book?.image?.url && !error) {
    currentImageUrl.value = baseUrl + trade.book.image.url
  }

  if (error) {
    currentImageUrl.value = NoImage
  }

  return currentImageUrl.value;
}

onBeforeMount(() => {
  getTrades();
});
</script>

<style>
.image {
  border-radius: 10px;
}

.card {
  min-height: 450px;
}
</style>

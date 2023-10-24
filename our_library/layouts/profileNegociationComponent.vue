<template>
  <q-card class="green-background shadow-0 q-pa-lg card">
    <q-card-section class="text-black text-weight-bold q-pa-none q-mb-sm">
      Negociações
    </q-card-section>
    <q-card-section
      class="row bg-white"
      style="border-radius: 5px;"
      v-for="trade in trades"
      :key="trade.id"
    >
      <div class="col-12 col-sm-12 col-md-4 col-lg-3">
        <q-img
          :src="
            trade?.book?.image?.url ? baseUrl + trade.book.image.url : noImage
          "
          spinner-color="white"
          class="image full-height"
          style="height: 140px; max-width: 150px"
        />
      </div>
      <div
        class="col-12 col-sm-12 col-md-8 col-lg-9 row q-pa-md items-end justify-end"
      >
        <div class="col-12 text-weight-bold q-mb-md">
          {{ trade?.book?.title || "Não definido" }} By:
          {{ trade?.book?.author || "Desconhecido" }}
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
          <q-btn style="background-color: #ffcc00" class="full-width"
            >Ver mais</q-btn
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
            v-model="trade.book.average_rating"
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
import NoImage from "../public/images/no_image.png";

const config = useRuntimeConfig();
const baseUrl = config.public.baseURL.replace("/api/v1", "");
const trades = ref([]);

const getTrades = async () => {
  try {
    const { data, status } = await useApi("/trades", {
      method: "get",
    });

    if (status?.value == "success") {
      if (data.value) {
        trades.value = data.value;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

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

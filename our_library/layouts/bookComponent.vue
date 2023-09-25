<template>
  <q-card class="shadow-0 ">
    <q-card-section class="book-card q-pa-lg row items-center justify-center">
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
        spinner-color="white"
        class="image"
      />
    </q-card-section>
    <q-card-section class="row">
      <div class="col-12">The Recullent Corner</div>
      <div class="col-12">
        <small> by HG . Walles </small>
      </div>
      <div class="col-6 text-red-10 text-weight-bold">
        Troca
      </div>
      <div class="col-6 text-right">
        <q-icon name="favorite_outline" size="sm" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    book: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style scoped>
.book-card {
  background-color: rgb(135, 207, 189);
  min-height: 300px;
  min-width: 200px;
}

.image {
  position: relative;
  margin-top: -40px;
  height: 300px;
  transform: skewY(-2deg); /* Inclinação para cima, ajuste o ângulo conforme necessário */
  transform-origin: top; 
}
</style>

<template>
  <q-page class="items-start text-black">
    <div class="row">
      <div class="col-12 text-center q-mb-0">
        <h3 class="text-red-10 text-weight-bold">Livros</h3>
      </div>
      <q-card class="col-12 row align-center shadow-0">
        <q-card-section
          class="col-12 row align-center items-center justify-between"
        >
          <div
            class="col-12 col-sm-12 col-md-2 col-lg-1 row align-center justify-center"
          >
            <q-btn
              class="text-white full-width"
              style="background-color: brown"
            >
              Novos Livros
            </q-btn>
          </div>
          <div
            class="col-12 col-sm-12 col-md-2 col-lg-1"
            :class="{ 'q-mt-md': $q.screen.sm || $q.screen.xs }"
          >
            <q-btn class="text-red-10 full-width" outline> Categoria </q-btn>
          </div>
          <div
            class="col-12 col-sm-9 col-md-6 col-lg-8 row justify-center"
            :class="{ 'q-mt-md': $q.screen.sm || $q.screen.md || $q.screen.xs }"
          >
            <q-input
              class="full-width"
              rounded
              standout
              v-model="text"
              placeholder="Pesquisar livro"
            >
              <template v-slot:prepend>
                <q-icon name="menu" color="gray" />
              </template>
            </q-input>
          </div>
          <div
            class="col-12 col-sm-2 col-md-1"
            :class="{
              'q-mr-md': !$q.screen.xs,
              'q-mt-md': $q.screen.sm || $q.screen.md || $q.screen.xs,
            }"
          >
            <q-btn class="text-red-10 full-width" outline> Ver Mais </q-btn>
          </div>
        </q-card-section>
        <q-card-section class="row full-width q-mt-lg">
          <div
            class="col-12 col-sm-12 col-md-4 col-lg-3"
            :class="{ 'q-pl-md': Number(i) > 1, 'q-py-md': !$q.screen.mobile }"
            v-for="i in 4"
            :key="i"
          >
            <BookComponent :book="{}" />
          </div>
        </q-card-section>
      </q-card>
      <div class="col-12 q-py-md text-center">
        <q-icon
          v-for="page in bookPagination.total"
          name="circle"
          class="link q-ma-xs"
          :color="page == bookPagination.page ? 'brown' : 'grey'"
          size="18px"
        ></q-icon>
      </div>
      <q-card class="col-12 row align-center shadow-0 q-mb-lg">
        <q-card-section
          class="col-12 row align-center items-center justify-between"
        >
          <div
            class="col-6 text-red-10 text-h4 text-weight-bold"
          >
            Mais Populares
          </div>
          <div
            class="col-6 row justify-end"
          >
            <q-btn class="text-red-10" outline> Ver Mais </q-btn>
          </div>
        </q-card-section>
        <q-card-section class="row full-width q-mt-lg">
          <div
            class="col-12 col-sm-12 col-md-4 col-lg-3"
            :class="{ 'q-pl-md': Number(i) > 1, 'q-py-md': !$q.screen.mobile }"
            v-for="i in 4"
            :key="i"
          >
            <BookComponent :book="{}" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import BookComponent from "~/layouts/bookComponent.vue";
import { ref } from "vue";

const category = ref();
const bookPagination = ref({
  page: 1,
  total: 3,
});
const response = await useApi("/posts", {
  method: "post",
  params: {
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
});

console.log(response.data);
</script>

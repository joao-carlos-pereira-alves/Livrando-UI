<template>
  <q-page class="items-start text-black">
    <div class="row">
      <div class="col-12 text-center q-mb-0">
        <h3 class="text-red-10 text-weight-bold">Livros</h3>
      </div>
      <q-card class="col-12 row align-center shadow-0">
        <q-card-section class="col-12 row align-center items-center justify-between">
          <div class="col-12 col-sm-12 col-md-2 col-lg-1 row align-center justify-center">
            <q-btn class="text-white full-width" style="background-color: brown" @click="openBookForm = true">
              Novos Livros
            </q-btn>
          </div>
          <div class="col-12 col-sm-12 col-md-2 col-lg-1" :class="{ 'q-mt-md': $q.screen.sm || $q.screen.xs }">
            <q-btn class="text-red-10 full-width" outline> Categoria </q-btn>
          </div>
          <div class="col-12 col-sm-9 col-md-6 col-lg-8 row justify-center"
            :class="{ 'q-mt-md': $q.screen.sm || $q.screen.md || $q.screen.xs }">
            <q-input class="full-width" rounded standout v-model="text" placeholder="Pesquisar livro">
              <template v-slot:prepend>
                <q-icon name="menu" color="gray" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-2 col-md-1" :class="{
            'q-mr-md': !$q.screen.xs,
            'q-mt-md': $q.screen.sm || $q.screen.md || $q.screen.xs,
          }">
            <q-btn class="text-red-10 full-width" outline> Ver Mais </q-btn>
          </div>
        </q-card-section>
        <q-card-section class="row full-width q-mt-lg">
          <div class="col-12 row" v-if="loadingBooks">
            <BookSkeleton
              v-for="i in 4"
              :key="i"
              class="col-12 col-sm-12 col-md-4 col-lg-3"
            />
          </div>
          <div class="col-12 row" v-else>
            <div
              class="col-12 col-sm-12 col-md-4 col-lg-3"
              :class="{
                'q-pl-md': Number(index) >= 1,
                'q-py-md': !$q.screen.mobile,
              }"
              v-for="(book, index) in books"
              :key="book.id"
            >
              <BookComponent :book="book" />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="col-12 q-py-md text-center">
        <q-icon
          v-for="currentPage in bookPagination.total"
          :key="currentPage"
          name="circle"
          class="link q-ma-xs"
          :color="currentPage == bookPagination.page ? 'brown' : 'grey'"
          size="18px"
          @click="updatePage(currentPage)"
        ></q-icon>
      </div>
      <q-card class="col-12 row align-center shadow-0 q-mb-lg">
        <q-card-section
          class="col-12 row align-center items-center justify-between"
        >
          <div class="col-6 text-red-10 text-h4 text-weight-bold">
            Mais Populares
          </div>
          <div class="col-6 row justify-end">
            <q-btn class="text-red-10" outline> Ver Mais </q-btn>
          </div>
        </q-card-section>
        <q-card-section class="row full-width q-mt-lg">
          <div class="col-12 row" v-if="loadingPopularBooks">
            <BookSkeleton
              v-for="i in 4"
              :key="i"
              class="col-12 col-sm-12 col-md-4 col-lg-3"
            />
          </div>
          <div class="col-12 row" v-else>
            <div
              class="col-12 col-sm-12 col-md-4 col-lg-3"
              :class="{
                'q-pl-md': Number(index) >= 1,
                'q-py-md': !$q.screen.mobile,
              }"
              v-for="(book, index) in books"
              :key="book.id"
            >
              <BookComponent :book="book" />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="col-12 q-py-md text-center">
        <q-icon
          v-for="currentPopularPage in popularBookPagination.total"
          :key="currentPopularPage"
          name="circle"
          class="link q-ma-xs"
          :color="
            currentPopularPage == popularBookPagination.page ? 'brown' : 'grey'
          "
          size="18px"
          @click="updatePage(currentPopularPage, true)"
        ></q-icon>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import BookComponent from "~/layouts/bookComponent.vue";
import { ref, onBeforeMount, watch, computed } from "vue";

const category = ref();
const loadingBooks = ref(true);
const loadingPopularBooks = ref(true);
const bookPagination = ref({
  page: 1,
  per_page: 4,
  total: 0,
  dashboard_view: true,
});

const bookPaginationPage = computed(() => bookPagination.value.page);
const books = ref([]);
const popularBooks = ref([]);
const popularBookPagination = ref({
  page: 1,
  per_page: 4,
  total: 0,
  dashboard_view: true,
  is_popular: true
});

const popularBookPaginationPage = computed(
  () => popularBookPagination.value.page
);

const getBooks = async (isPopular = false) => {
  try {
    let params = {};

    if (isPopular) {
      params = {
        ...popularBookPagination.value,
      };
    } else {
      params = {
        ...bookPagination.value,
      };
    }

    const { data, pending, status, execute } = await useApi("/books", {
      method: "get",
      params: params,
      lazy: true,
    });

    watch(pending, () => {
      if (isPopular) {
        loadingPopularBooks.value = pending.value;
      } else {
        loadingBooks.value = pending.value;
      }
    });

    watch(execute, () => {
      if (data?.value) {
        const { books: booksResponse, pagination_params } = data?.value ?? {};
        const { page, per_page, total } = pagination_params ?? {};

        if (isPopular) {
          popularBooks.value = booksResponse || [];
          popularBookPagination.value = {
            page: page,
            per_page: per_page,
            total: Math.ceil(total / per_page),
            dashboard_view: true,
            is_popular: true,
          };
        } else {
          books.value = booksResponse || [];
          bookPagination.value = {
            page: page,
            per_page: per_page,
            total: Math.ceil(total / per_page),
            dashboard_view: true,
          };
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const updatePage = (page: Number, isPopular = false) => {
  if (isPopular) {
    popularBookPagination.value.page = page;
  } else {
    bookPagination.value.page = page;
  }
};

onBeforeMount(async () => {
  getBooks();
  getBooks(true);
});

watch(bookPaginationPage, (beforePage, afterPage) => {
  if (afterPage == bookPaginationPage) return;

  getBooks();
});

watch(popularBookPaginationPage, (beforePage, afterPage) => {
  if (afterPage == popularBookPaginationPage) return;

  getBooks(true);
});
</script>

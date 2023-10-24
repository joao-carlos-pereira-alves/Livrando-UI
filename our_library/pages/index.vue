<template>
  <q-page class="items-start text-black">
    <BookTradeComponent
      v-model:open="openBookTrade"
      :book="currentBookTrade"
      :categories="categories"
      v-if="openBookTrade"
    />
    <BookForm
      v-if="openBookForm"
      :openBookForm="openBookForm"
      @close="openBookForm = false"
      :categories="categories"
      @created="unshiftBook"
    />
    <div class="row">
      <div
        class="col-12 text-center q-mb-0 row justify-center"
        :class="{ 'q-my-lg q-pa-xl': loadingDOM }"
      >
        <q-skeleton type="rect" width="200px" v-if="loadingDOM" />
        <h3 class="text-red-10 text-weight-bold" v-else>Livros</h3>
      </div>
      <q-card class="col-12 row align-center shadow-0 q-mb-md">
        <FilterSkeleton class="col-12" v-if="loadingDOM" />
        <q-card-section
          class="col-12 row align-center items-center justify-between"
          v-else
        >
          <div
            class="col-12 col-sm-12 col-md-2 row align-center justify-center"
            :class="{ 'q-pr-md': $q.screen.md || $q.screen.lg || $q.screen.xl }"
          >
            <q-btn
              class="text-white full-width"
              style="background-color: brown"
              disable
            >
              Meus Livros
            </q-btn>
          </div>
          <div
            class="col-12 col-sm-12 col-md-2"
            :class="{
              'q-mt-md': $q.screen.sm || $q.screen.xs,
              'q-pr-md': $q.screen.md || $q.screen.lg || $q.screen.xl,
            }"
          >
            <q-btn class="text-red-10 full-width" outline label="Categoria">
              <q-menu transition-show="jump-down" transition-hide="jump-up">
                <q-list
                  style="max-height: 400px; min-width: 200px; overflow: auto"
                >
                  <q-item
                    clickable
                    v-close-popup
                    v-for="category in categories"
                    :key="category"
                  >
                    <q-item-section>
                      <q-checkbox
                        v-model="category.selected"
                        :label="category.name"
                        @update:model-value="debouncedSearch"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <div
            class="col-12 col-sm-12 col-md-8 col-lg-8 row justify-center"
            :class="{ 'q-mt-md': $q.screen.sm || $q.screen.md || $q.screen.xs }"
          >
            <q-input
              class="full-width"
              rounded
              standout
              v-model="bookSearch"
              placeholder="Pesquisar livro"
            >
              <template v-slot:prepend>
                <q-icon name="search" color="gray" />
              </template>
            </q-input>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="col-12 row align-center shadow-0">
        <q-card-section
          class="col-12 row align-center items-center justify-between"
        >
          <q-skeleton type="rect" class="text col-2" v-if="loadingDOM" />
          <div class="col-6 text-red-10 text-h4 text-weight-bold" v-else>
            Novos
          </div>
          <div class="col-6 row justify-end">
            <q-skeleton type="QBtn" class="text-subtitle1" v-if="loadingDOM" />
            <q-btn
              v-else
              class="text-red-10"
              outline
              @click="openBookForm = true"
            >
              Publicar
            </q-btn>
          </div>
        </q-card-section>
        <q-card-section class="col-12">
          <q-separator style="background-color: #f5f1e3" />
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
              <BookComponent :book="book" @trade="setCurrentTrade" />
            </div>
            <div class="text-center col-12" v-if="!books.length">
              Por enquanto está vazio.
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
          <q-skeleton type="rect" class="text col-2" v-if="loadingDOM" />
          <div class="col-6 text-red-10 text-h4 text-weight-bold" v-else>
            Mais Populares
          </div>
          <div class="col-6 row justify-end">
            <q-skeleton type="QBtn" class="text-subtitle1" v-if="loadingDOM" />
            <q-btn class="text-red-10" outline v-else> Ver Mais </q-btn>
          </div>
        </q-card-section>
        <q-card-section class="col-12">
          <q-separator style="background-color: #f5f1e3" />
        </q-card-section>
        <q-card-section class="row full-width q-mt-lg">
          <div class="col-12 row" v-if="loadingPopularBooks">
            <BookSkeleton
              v-for="i in 4"
              :key="i"
              class="col-12 col-sm-12 col-md-4 col-lg-3"
            />
          </div>
          <div class="col-12 row items-center" v-else>
            <div
              class="col-12 col-sm-12 col-md-4 col-lg-3"
              :class="{
                'q-pl-md': Number(index) >= 1,
                'q-py-md': !$q.screen.mobile,
              }"
              v-for="(book, index) in popularBooks"
              :key="book.id"
            >
              <BookComponent :book="book" @trade="setCurrentTrade" />
            </div>
            <div class="text-center col-12" v-if="!popularBooks.length">
              Por enquanto está vazio.
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
import BookForm from "../components/BookForm.vue";
import { ref, onBeforeMount, watch, computed, onMounted } from "vue";
import BookTradeComponent from "~/components/BookTradeComponent.vue";

const loadingDOM = ref(true);
const loadingBooks = ref(true);
const loadingPopularBooks = ref(true);
const bookPagination = ref({
  page: 1,
  per_page: 4,
  total: 0,
  dashboard_view: true,
});
const bookSearch = ref("");
const debounceTimer = ref(null);
const bookPaginationPage = computed(() => bookPagination.value.page);
const books = ref([]);
const popularBooks = ref([]);
const popularBookPagination = ref({
  page: 1,
  per_page: 4,
  total: 0,
  dashboard_view: true,
  is_popular: true,
});
const categories = ref([]);
const openBookTrade = ref(false);
const currentBookTrade = ref({});

let openBookForm = ref(false);

const popularBookPaginationPage = computed(
  () => popularBookPagination.value.page
);

const debouncedSearch = () => {
  // Cancela o temporizador anterior, se houver
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }

  // Inicia um novo temporizador para executar a pesquisa após 500 ms (ajuste conforme necessário)
  debounceTimer.value = setTimeout(() => {
    getBooks(false, { title: bookSearch.value });
    getBooks(true, { title: bookSearch.value });
  }, 500);
};

const getBooks = async (isPopular = false, filter_params: Object = {}) => {
  try {
    let params = {
      ...filter_params,
      category_ids: [
        categories.value
          .filter((category) => category.selected)
          .map((category) => category.id),
      ],
    };

    if (isPopular) {
      params = Object.assign(params, popularBookPagination.value);
    } else {
      params = Object.assign(params, bookPagination.value);
    }

    const { data, execute, abort, canAbort } = await useApi("/books", {
      method: "get",
      params: params,
      lazy: true,
    });

    await execute();

    setTimeout(() => {
      if (canAbort?.value) abort();
    }, 400);

    if (data?.value) {
      const { books: booksResponse, pagination_params } = data.value ?? {};
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

    loadingBooks.value = false;
    loadingPopularBooks.value = false;
  } catch (error) {
    console.error(error);
  }
};

const getCategories = async () => {
  try {
    const { data, execute } = await useApi("/categories", {
      method: "get",
      lazy: true,
    });

    await execute();

    if (data?.value) {
      const formattedValue =
        data?.value?.map((category) =>
          Object.assign(category, { selected: false })
        ) || [];
      categories.value = formattedValue;
    }
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

const setCurrentTrade = (book: Object) => {
  currentBookTrade.value = { ...book };
  openBookTrade.value = true;
};

const unshiftBook = (book: object) => {
  books.value.unshift(book);
};

onBeforeMount(() => {
  getBooks();
  getBooks(true);
  getCategories();
});

onMounted(() => {
  loadingDOM.value = false;
});

watch(bookPaginationPage, (beforePage, afterPage) => {
  if (afterPage == bookPaginationPage.value) return;

  getBooks();
});

watch(popularBookPaginationPage, (beforePage, afterPage) => {
  if (afterPage == popularBookPaginationPage.value) return;

  getBooks(true);
});

watch(bookSearch, () => {
  debouncedSearch();
});
</script>

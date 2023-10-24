<template>
  <q-card
    class="row items-center q-pa-md justify-between shadow-0 text-weight-bold"
  >
    <q-skeleton
      class="col-12 col-sm-12 col-md-2"
      type="QToolbar"
      :class="{ 'q-mt-sm': $q.screen.xs || $q.screen.sm }"
      v-if="loadingDOM"
    />
    <q-card-section
      class="col-12 col-sm-12 col-md-2 text-center q-pa-0"
      :class="{ 'q-mt-sm': $q.screen.xs || $q.screen.sm }"
      style="background-color: #badcc8; border-radius: 5px"
      v-else
    >
      {{ review.published_books || 0 }} Publicações
    </q-card-section>
    <q-skeleton
      class="col-12 col-sm-12 col-md-2"
      type="QToolbar"
      :class="{ 'q-mt-sm': $q.screen.xs || $q.screen.sm }"
      v-if="loadingDOM"
    />
    <q-card-section
      class="col-12 col-sm-12 col-md-2 text-center q-pa-0"
      style="background-color: #badcc8; border-radius: 5px"
      :class="{ 'q-mt-sm': $q.screen.xs || $q.screen.sm }"
      v-else
    >
      {{ review.assessments || 0 }} Avaliações
    </q-card-section>
    <q-skeleton
      class="col-12 col-sm-12 col-md-2"
      type="QToolbar"
      :class="{ 'q-mt-sm': $q.screen.xs || $q.screen.sm }"
      v-if="loadingDOM"
    />
    <q-card-section
      class="col-12 col-sm-12 col-md-2 text-center q-pa-0"
      style="background-color: #badcc8; border-radius: 5px"
      :class="{ 'q-mt-sm': $q.screen.xs || $q.screen.sm }"
      v-else
    >
      {{ review.donations }} Doações
    </q-card-section>
    <q-skeleton
      class="col-12 col-sm-12 col-md-2"
      type="QToolbar"
      :class="{ 'q-mt-sm': $q.screen.xs || $q.screen.sm }"
      v-if="loadingDOM"
    />
    <q-card-section
      class="col-12 col-sm-12 col-md-2 text-center q-pa-0"
      style="background-color: #badcc8; border-radius: 5px"
      :class="{ 'q-mt-sm': $q.screen.xs || $q.screen.sm }"
      v-else
    >
      {{ review.exchanges }} Trocas
    </q-card-section>
    <q-skeleton
      class="col-12 col-sm-12 col-md-2"
      type="QToolbar"
      :class="{ 'q-mt-sm': $q.screen.xs || $q.screen.sm }"
      v-if="loadingDOM"
    />
    <q-card-section
      class="col-12 col-sm-12 col-md-2 text-center q-pa-0"
      style="background-color: #badcc8; border-radius: 5px"
      :class="{ 'q-mt-sm': $q.screen.xs || $q.screen.sm }"
      v-else
    >
      {{ review.loans }} Empréstimos
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { authentication } from "../store/modules/authentication";

export default {
  data: () => ({
    loadingDOM: true,
    review: {
      published_books: 0,
      assessments: 0,
      donations: 0,
      exchanges: 0,
      loans: 0,
    },
  }),
  setup() {
    const { _auth } = authentication();
    const review = ref({
      published_books: _auth.published_books,
      assessments: _auth.reviewed_books,
      donations: _auth.donation_books,
      exchanges: _auth.replacement_books,
      loans: _auth.loan_books,
    })

    return {
      review
    }
  },
  methods: {},
  mounted() {
    this.loadingDOM = false;
  },
};
</script>

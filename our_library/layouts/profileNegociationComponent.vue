<template>
  <q-card class="green-background shadow-0 q-pa-lg card">
    <q-card-section class="text-black text-weight-bold q-pa-none q-mb-sm"> Negociações </q-card-section>
    <q-card-section class="row bg-white" style="border-radius: 5px;">
      <div class="col-12 col-sm-12 col-md-4 col-lg-3">
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          spinner-color="white"
          class="image full-height"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-8 col-lg-9 row q-pa-md items-center justify-end">
        <div class="col-12 text-weight-bold q-mb-md">Jade City By: Fonda Lee</div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
          <q-btn style="background-color: #ffcc00" class="full-width">Ver mais</q-btn>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 text-center" :class="{'q-pl-md': $q.screen.lg || $q.screen.xl, 'q-mt-md': !$q.screen.lg || !$q.screen.xl }">
          <q-rating
            v-model="ratingModel"
            size="1.8em"
            :max="5"
            color="yellow"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style>
.image {
  border-radius: 10px;
}

.card {
  min-height: 450px;
}
</style>
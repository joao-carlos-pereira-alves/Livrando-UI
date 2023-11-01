<template>
  <q-dialog v-model="openDialog" persistent>
    <RatingComponent
      v-model:open="openRatingDialog"
      :book="book"
      v-model:rating="book.rating"
      v-if="openRatingDialog"
      @evaluated="evaluated"
    />
    <q-card style="min-width: min(85vw, 500px)">
      <q-card-section class="text-red-10 text-weight-bold">
        {{
          trade.status == "completed"
            ? "Negociação finalizada"
            : `Solicitar ${formatTitleCard(
                book.negotiation_type
              )?.toLowerCase()}`
        }}
      </q-card-section>
      <q-card-section class="row">
        <div class="col-12 col-sm-4 flex-column text-center wrap">
          <q-img
            :src="book?.image?.url ? baseUrl + book.image.url : noImage"
            spinner-color="white"
            style="height: 140px; max-width: 150px"
          />
          <q-rating
            v-model="book.rating"
            class="q-mt-sm"
            size="1.8em"
            :max="5"
            color="yellow"
            @click="openRatingDialog = true"
          />
        </div>
        <div class="col-12 col-sm-8 row">
          <div class="col-12 col-sm-6" :class="{ 'q-pr-sm': !$q.screen.xs }">
            <label class="form-label">Título</label>
            <q-input
              outlined
              :rules="[rules.required]"
              v-model="book.title"
              placeholder="Insira seu nome"
              color="secondary"
              lazy-rules
              dense
            />
          </div>
          <div class="col-12 col-sm-6">
            <label class="form-label">ISBN</label>
            <q-input
              outlined
              v-model="book.isbn"
              :rules="[rules.required]"
              placeholder="Insira o código ISBN"
              lazy-rules
              color="secondary"
              dense
              disable
            ></q-input>
          </div>
          <div class="col-12 col-sm-6" :class="{ 'q-pr-sm': !$q.screen.xs }">
            <label class="form-label">Descrição</label>
            <q-input
              outlined
              :rules="[rules.required]"
              v-model="book.description"
              placeholder="Insira uma descrição"
              lazy-rules
              color="secondary"
              dense
              disable
            ></q-input>
          </div>
          <div class="col-12 col-sm-6">
            <label class="form-label">Categoria</label>
            <q-select
              outlined
              :rules="[rules.requiredSelect]"
              v-model="book.categories"
              :options="book.categories"
              multiple
              option-label="name"
              label="Selecione uma categoria"
              color="secondary"
              lazy-rules
              dense
              disable
            />
          </div>
          <div class="col-12 col-sm-6" :class="{ 'q-pr-sm': !$q.screen.xs }">
            <label class="form-label">Autor</label>
            <q-input
              outlined
              v-model="book.author"
              :rules="[rules.required]"
              placeholder="Insira o autor"
              lazy-rules
              color="secondary"
              dense
              disable
            ></q-input>
          </div>
          <div class="col-12 col-sm-6">
            <label class="form-label">Editora</label>
            <q-input
              outlined
              v-model="book.publishing_company"
              :rules="[rules.required]"
              label="Insira o autor"
              lazy-rules
              color="secondary"
              dense
              disable
            ></q-input>
          </div>
          <div class="col-12 col-sm-6" :class="{ 'q-pr-sm': !$q.screen.xs }">
            <label class="form-label">Ano de públicação </label>
            <q-input
              type="number"
              outlined
              v-model="book.publication_year"
              placeholder="2023"
              lazy-rules
              color="secondary"
              :rules="[rules.required]"
              dense
              disable
            ></q-input>
          </div>
          <div class="col-12 col-sm-6">
            <label class="form-label">Língua</label>
            <q-select
              outlined
              :rules="[rules.requiredSelect]"
              v-model="book.language"
              :options="languages"
              label="Selecione uma língua"
              color="secondary"
              lazy-rules
              dense
              disable
            />
          </div>
          <div class="col-12 col-sm-6" :class="{ 'q-pr-sm': !$q.screen.xs }">
            <label class="form-label">Quantidade</label>
            <q-input
              type="number"
              :rules="[rules.requiredNumber]"
              outlined
              v-model="book.amount"
              placeholder="Insira a quantidade"
              lazy-rules
              color="secondary"
              dense
              disable
            ></q-input>
          </div>
          <div class="col-12 col-sm-6">
            <label class="form-label">Negociar com</label>
            <q-select
              outlined
              :rules="[rules.requiredSelect]"
              v-model="book.negotiation_type"
              option-value="model_name"
              :options="negotiationTypes"
              option-label="title"
              lazy-rules
              label="Selecione uma negociação"
              color="secondary"
              dense
              disable
            >
              <template v-slot:selected-item>
                <div>
                  {{ formatTitleCard(book.negotiation_type) }}
                </div>
              </template>
            </q-select>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="row justify-end q-pr-sm">
        <q-btn
          label="Cancelar"
          class="text-grey"
          outline
          style="background-color: rgba(0, 0, 0, 0.1)"
          @click="closeDialog"
        />
        <q-btn
          :label="
            trade.status == 'completed'
              ? 'Negociação finalizada'
              : 'Concluir negociação'
          "
          type="reset"
          :color="trade.status == 'completed' ? 'green' : 'red-10'"
          :disable="
            trade.status == 'completed' || trade.negotiator_id != _auth.id
          "
          class="q-ml-sm q-mr-sm"
          @click="updateTrade(trade.id)"
        >
          <q-tooltip
            v-if="
              trade.status != 'completed' && trade.negotiator_id != _auth.id
            "
          >
            Apenas o responsável pelo livro pode concluir a negociação.
          </q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import NoImage from "../public/images/no_image.png";
import { authentication } from "../store/modules/authentication";
import RatingComponent from "./RatingComponent.vue";

export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    trade: {
      type: Object,
      required: true,
    },
    book: {
      type: Object,
      required: true,
    },
  },
  components: {
    NoImage,
    RatingComponent,
  },
  data: () => ({
    rules: {
      required: (v) => !!v || "Campo obrigatório",
    },
    negotiationTypes: [
      { title: "Doação", id: 1, model_name: "donation" },
      { title: "Troca", id: 2, model_name: "replacement" },
      { title: "Empréstimo", id: 3, model_name: "loan" },
    ],
  }),
  setup(_, { emit }) {
    const { $swal } = useNuxtApp();
    const { _auth } = authentication();
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseURL.replace("/api/v1", "");
    const noImage = NoImage;
    const openRatingDialog = ref(false);

    const closeDialog = () => {
      emit("update:open", false);
    };

    const updateTrade = async (trade_id) => {
      try {
        const { status, error } = await useApi("/trades/" + trade_id, {
          method: "put",
          body: {
            trade: {
              status: "completed",
            },
          },
        });

        if (status?.value == "success") {
          $swal.fire({
            position: "center",
            icon: "success",
            title: "Negociação concluída!",
            showConfirmButton: false,
            timer: 1500,
          });

          emit("trade", "completed");
        }

        if (status?.value == "error") {
          if (error?.value?.data?.base) {
            const errorMessage = error.value.data.base;
            $swal.fire({
              position: "top-end",
              icon: "error",
              title: errorMessage + ".",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        }

        closeDialog();
      } catch (err) {
        console.log(err);
      }
    };

    const evaluated = () => {
      openRatingDialog.value = false;
      closeDialog();

      $swal.fire({
        position: "top-right",
        icon: "success",
        title: "Livro avaliado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
    };

    return {
      baseUrl,
      noImage,
      updateTrade,
      closeDialog,
      _auth,
      openRatingDialog,
      evaluated
    };
  },
  methods: {
    formatTitleCard(negotiation_type = "donation") {
      const categories = {
        replacement: "Troca",
        loan: "Empréstimo",
        donation: "Doação",
      };

      return categories[negotiation_type];
    },
  },
  computed: {
    openDialog() {
      return this.open || false;
    },
  },
};
</script>

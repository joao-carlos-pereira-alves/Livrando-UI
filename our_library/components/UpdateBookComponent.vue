<template>
  <q-dialog v-model="openDialog" persistent>
    <q-card class="my-card col-md-4 col-xs-12" style="max-width: 42rem">
      <q-card-section>
        <div class="text-h6 title text-red-10">Atualizar</div>
        <div class="text-subtitle text-grey-9">
          Informe os dados do livro a ser atualizado
        </div>
      </q-card-section>
      <q-card-section>
        <q-form ref="bookForm" class="row" lazy-rules>
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
              mask="###-#-#####-###-#"
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
            ></q-input>
          </div>
          <div class="col-12 col-sm-6">
            <label class="form-label">Categoria</label>
            <q-select
              outlined
              :rules="[rules.requiredSelect]"
              v-model="book.book_categories_attributes"
              :options="categories"
              multiple
              option-label="name"
              label="Selecione uma categoria"
              color="secondary"
              lazy-rules
              dense
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
            ></q-input>
          </div>
          <div class="col-12 col-sm-6">
            <label class="form-label">Editora</label>
            <q-input
              outlined
              v-model="book.publishing_company"
              :rules="[rules.required]"
              label="Insira a editora"
              lazy-rules
              color="secondary"
              dense
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
              min="1"
            ></q-input>
          </div>
          <div class="col-12 col-sm-6">
            <label class="form-label">Tipos de negociação</label>
            <q-select
              outlined
              :rules="[rules.requiredSelect]"
              v-model="negotiation_type"
              option-value="model_name"
              :options="negotiationTypes"
              option-label="title"
              lazy-rules
              label="Selecione uma negociação"
              color="secondary"
              dense
            >
              <template v-slot:selected-item>
                <div>
                  {{ formatTitleCard(book.negotiation_type) }}
                </div>
              </template>
            </q-select>
          </div>
          <div class="col-12">
            <label class="form-label">Upload Imagem</label>
            <q-file
              outlined
              v-model="book.image"
              :rules="[(v) => !!v || 'Campo obrigatório']"
              max-files="1"
              accept="image/*"
              label="Insira a capa do livro"
              lazy-rules
              color="secondary"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="upload" color="secondary" />
              </template>
            </q-file>
          </div>
          <div class="row col-12 q-mt-md justify-end">
            <q-btn
              label="Cancelar"
              type="reset"
              outline
              color="grey-7"
              class="q-ml-sm q-mr-sm"
              @click="closeDialog"
            />
            <q-btn
              label="Atualizar"
              color="red-10"
              @click="updateBook"
              :loading="loadingUpdateBook"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import NoImage from "../public/images/no_image.png";

export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    book: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
      default: [],
    },
  },
  components: {
    NoImage,
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
  setup(props, { emit }) {
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseURL.replace("/api/v1", "");
    const noImage = NoImage;
    const loadingUpdateBook = ref(false);
    const bookForm = ref(null);
    const book = props.book;
    const negotiation_type = ref(book?.negotiation_type || null);
    const { $swal } = useNuxtApp();

    const closeDialog = () => {
      emit("update:open", false);
    };

    const negotiationTypes = [
      { title: "Doação", id: 1, model_name: "donation" },
      { title: "Troca", id: 2, model_name: "replacement" },
      { title: "Empréstimo", id: 3, model_name: "loan" },
    ];

    const rules = {
      required: (val) => (val && val.length > 0) || "Campo obrigatório",
      requiredNumber: (val) => (val && val > 0) || "Campo obrigatório",
      requiredSelect: (val) =>
        (val && Object.keys(val).length > 0) || "Campo obrigatório",
    };

    const formatTitleCard = (negotiation_type = "donation") => {
      const categories = {
        replacement: "Troca",
        loan: "Empréstimo",
        donation: "Doação",
      };

      return categories[negotiation_type];
    };

    const updateBook = async () => {
      if (!bookForm) return;

      bookForm.value?.validate().then(async (res) => {
        if (res && process.client) {
          if (book) {
            book.negotiation_type = negotiation_type?.model_name || negotiation_type;
            book.book_categories_attributes =
              book.book_categories_attributes?.map((book_category) => {
                return { category_id: book_category.id };
              });
          }

          try {
            const form = Object.entries(book).reduce((acc, [key, value]) => {
              if (value !== "") {
                acc[key] = value;
              }
              return acc;
            }, {});

            if (form?.image?.length == 0) delete form.image;
            if (!(form?.image instanceof File)) delete form.image;
            if (form?.image?.length) form.image = form.image[0];

            const formData = new FormData();

            Object.keys(form).forEach((key) => {
              if (key === "book_categories_attributes") {
                form[key].forEach((category, index) => {
                  Object.keys(category).forEach((subKey) => {
                    formData.append(
                      `book[${key}][${index}][${subKey}]`,
                      category[subKey]
                    );
                  });
                });
              } else {
                formData.append(`book[${key}]`, form[key]);
              }
            });

            loadingUpdateBook.value = true;

            const { status, execute } = useApi(`/books/${book.id}`, {
              method: "put",
              body: formData,
            });

            await execute();

            if (status?.value == "success") {
              closeDialog();
              $swal.fire({
                position: "top-end",
                icon: "success",
                title: "Livro atualizado com sucesso!",
                showConfirmButton: false,
                timer: 1500,
              });
              loadingUpdateBook.value = false;
            }
          } catch (error) {
            console.error("error", error);
            $swal.fire({
              position: "top-end",
              icon: "error",
              title: "Não foi possível atualizar o livro.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
    };

    return {
      baseUrl,
      noImage,
      loadingUpdateBook,
      closeDialog,
      updateBook,
      rules,
      negotiationTypes,
      bookForm,
      formatTitleCard,
      negotiation_type
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

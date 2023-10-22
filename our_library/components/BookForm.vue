<template>
  <q-dialog v-model="open" persistent>
    <q-card class="my-card col-md-4 col-xs-12" style="max-width: 42rem">
      <q-card-section>
        <div class="text-h6 title text-red-10">Publicar</div>
        <div class="text-subtitle text-grey-9">
          Informe os dados do livro a ser publicado
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
              label="Insira o autor"
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
            ></q-input>
          </div>
          <div class="col-12 col-sm-6">
            <label class="form-label">Tipos de negociação</label>
            <q-select
              outlined
              :rules="[rules.requiredSelect]"
              v-model="book.negotiation_type"
              option-value="model_name"
              :options="negotiationTypes"
              option-label="title"
              label="Selecione uma negociação"
              color="secondary"
              dense
            />
          </div>
          <div class="col-12">
            <label class="form-label">Upload Imagem</label>
            <q-file
              outlined
              v-model="book.image"
              :rules="[(v) => !!v || 'Campo obrigatório']"
              placeholder="Insira a capa do livro"
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
            <q-btn label="Publicar" color="red-10" @click="createBook" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";
import { authentication } from "../store/modules/authentication";

const { $swal } = useNuxtApp();
const { _auth } = authentication();
const currentUserId = _auth.id;
const props = defineProps({
  openBookForm: { type: Boolean, default: false },
  categories: { type: Array, default: [] },
});
const emit = defineEmits();
const open = computed(() => props.openBookForm);
const book = ref<Book>({
  title: "",
  isbn: "",
  description: "",
  author: "",
  publishing_company: "",
  publication_year: "",
  language: null,
  amount: 0,
  negotiation_type: "",
  responsible_id: 0,
  added_by_id: 0,
  image: null,
});
const bookForm = ref(null);
const languages = ref([
  "portuguese",
  "english",
  "spanish",
  "french",
  "german",
  "chinese",
  "japanese",
  "korean",
  "arabic",
  "russian",
  "italian",
  "dutch",
  "hindi",
  "bengali",
  "urdu",
  "turkish",
  "persian",
  "vietnamese",
  "thai",
  "indonesian",
  "malay",
  "swahili",
]);

interface Category {
  category_id: number;
}

interface Book {
  id?: number;
  title: string;
  isbn: string;
  description: string;
  author: string;
  publishing_company: string;
  publication_year: string;
  language: string | null;
  amount: number;
  negotiation_type: string;
  image?: any;
  responsible_id: number;
  added_by_id: number;
  book_categories_attributes?: Array<Category>;
}

interface Negotiation {
  id: number;
  title: string;
  model_name: string;
}

const closeDialog = () => {
  emit("close");
};

const negotiationTypes = ref<Array<Negotiation>>([
  { title: "Doação", id: 1, model_name: "donation" },
  { title: "Troca", id: 2, model_name: "replacement" },
  { title: "Empréstimo", id: 3, model_name: "loan" },
]);

const rules = {
  required: (val: string) => (val && val.length > 0) || "Campo obrigatório",
  requiredNumber: (val: number) => (val && val > 0) || "Campo obrigatório",
  requiredSelect: (val: object) =>
    (val && Object.keys(val).length > 0) || "Campo obrigatório",
};

const createBook = async () => {
  if (!bookForm) return;

  bookForm.value?.validate();

  bookForm.value?.validate().then(async (res: boolean) => {
    if (res && process.client) {
      if (book?.value) {
        book.value.responsible_id = currentUserId;
        book.value.added_by_id = currentUserId;
        book.value.negotiation_type = book.value.negotiation_type.model_name;
        book.value.book_categories_attributes =
          book.value.book_categories_attributes?.map((book_category) => {
            return { category_id: book_category.id };
          });
      }

      try {
        const form = Object.entries(book.value).reduce((acc, [key, value]) => {
          if (value !== "") {
            acc[key] = value;
          }
          return acc;
        }, {});

        if (form?.image?.length == 0) delete form.image;
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

        const { data, execute } = await useApi("/books", {
          method: "post",
          body: formData,
        });

        await execute();

        if (data?.value) {
          closeDialog();
          $swal.fire({
            position: "top-end",
            icon: "success",
            title: "Ação realizada com sucesso!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("error", error);
        $swal.fire({
          position: "top-end",
          icon: "error",
          title: "Ação não realizada.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  });
};
</script>

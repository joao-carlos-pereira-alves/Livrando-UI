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
        <q-form ref="bookForm">
          <div class="row col-12 q-gutter-md">
            <div class="q-mb-md col-6">
              <label class="form-label">Título</label>
              <q-input
                outlined
                :rules="[rules.required]"
                v-model="book.title"
                placeholder="Insira seu nome"
              />
            </div>
            <div class="q-mb-md col-5">
              <label class="form-label">ISBN</label>
              <q-input
                outlined
                v-model="book.isbn"
                placeholder="Insira o código ISBN"
                lazy-rules
              ></q-input>
            </div>
            <div class="q-mb-md col-6">
              <label class="form-label">Descrição</label>
              <q-input
                outlined
                :rules="[rules.required]"
                v-model="book.description"
                placeholder="Insira uma descrição"
                lazy-rules
              ></q-input>
            </div>
            <div class="q-mb-md col-5">
              <label class="form-label">Categoria</label>
              <q-select
                outlined
                :rules="[rules.requiredSelect]"
                v-model="book.category"
                :options="categories"
                option-label="name"
                placeholder="Selecione uma categoria"
              />
            </div>
            <div class="q-mb-md col-6">
              <label class="form-label">Autor</label>
              <q-input
                outlined
                v-model="book.author"
                placeholder="Insira o autor"
                lazy-rules
              ></q-input>
            </div>
            <div class="q-mb-md col-5">
              <label class="form-label">Editora</label>
              <q-input
                outlined
                v-model="book.publishing_company"
                placeholder="Insira o autor"
                lazy-rules
              ></q-input>
            </div>
            <div class="q-mb-md col-6">
              <label class="form-label">Ano de públicação </label>
              <q-input
                type="number"
                outlined
                v-model="book.publication_year"
                placeholder="Insira o autor"
                lazy-rules
              ></q-input>
            </div>
            <div class="q-mb-md col-5">
              <label class="form-label">Língua</label>
              <q-select
                outlined
                :rules="[rules.requiredSelect]"
                v-model="book.language"
                :options="languages"
                placeholder="Selecione uma língua"
              />
            </div>
            <div class="q-mb-md col-6">
              <label class="form-label">Quantidade</label>
              <q-input
                type="number"
                :rules="[rules.requiredNumber]"
                outlined
                v-model="book.amount"
                placeholder="Insira a quantidade"
                lazy-rules
              ></q-input>
            </div>
            <div class="q-mb-md col-5">
              <label class="form-label">Tipos de negociação</label>
              <q-select
                outlined
                :rules="[rules.requiredSelect]"
                v-model="book.negotiation_type"
                :options="negotiationTypes"
                option-label="title"
                placeholder="Selecione um tipo de negociação"
              />
            </div>
            <div class="q-mb-md col-6">
              <label class="form-label">Upload Imagem</label>
              <q-input
                outlined
                v-model="book.file"
                placeholder="Insira a capa do livro"
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="upload" color="black" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row justify-end">
            <q-btn
              label="Cancelar"
              type="reset"
              outline
              color="grey-7"
              class="q-ml-sm q-mr-sm"
              @click="close(false)"
            />
            <q-btn label="Publicar" color="red-10" @click="saveBook" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  openBookForm: { type: Boolean, default: false },
});

onBeforeMount(() => {
  getCategories();
});

interface Category {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  isbn: string;
  description: string;
  author: string;
  publishing_company: string;
  publication_year: string;
  language: string;
  amount: number;
  negotiation_type: string;
  category?: Category;
  file: string;
  responsible: number;
  added_by: number;
  category_id: number;
}

interface Negotiation {
  id: number;
  title: string;
}

const open = ref(props.openBookForm);

const isOpen = computed({
  get() {
    return props.openBookForm;
  },
  set(value) {
    open.value = value;
  },
});

const close = (value: boolean) => {
  isOpen.value = value;
};

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

let categories = ref<Array<Category>>();
let book = ref<Book>({
  id: 0,
  title: "",
  isbn: "",
  description: "",
  author: "",
  publishing_company: "",
  publication_year: "",
  language: "",
  amount: 0,
  negotiation_type: "",
  file: "",
  responsible: 0,
  added_by: 0,
  category_id: 0,
});
const bookForm = ref(null);

const negotiationTypes = ref<Array<Negotiation>>([
  { title: "Doação", id: 1 },
  { title: "Troca", id: 2 },
  { title: "Empréstimo", id: 3 },
]);

const rules = {
  required: (val: string) => (val && val.length > 0) || "Campo obrigatório",
  requiredNumber: (val: number) => (val && val > 0) || "Campo obrigatório",
  requiredSelect: (val: object) =>
    (val && Object.keys(val).length > 0) || "Campo obrigatório",
};

const getCategories = async () => {
  const { data: response } = await useApi("/categories", {
    method: "get",
  });

  categories = response;
};

const saveBook = async () => {
  if (!bookForm) return;

  bookForm.value?.validate();

  const currentUser: string | null = JSON.parse(localStorage.getItem("_auth"));

  if (book && book.value) {
    book.value.responsible = currentUser?.id;
    book.value.responsible = currentUser?.id;
    book.value.added_by = currentUser?.id;
    book.value.category_id = book.value.category.id;
  }

  try {
    const response = await useApi("/books", {
      method: "post",
      body: {
        book: book.value,
      },
    });
  } catch (error) {
    console.error("error", error);
  }
};

function onReset() {
  book.value = {
    id: 0,
    title: "",
    isbn: "",
    description: "",
    author: "",
    publishing_company: "",
    publication_year: "",
    language: "",
    amount: 0,
    negotiation_type: "",
    category: {
      id: 0,
      name: "",
    },
    file: "",
    responsible: 0,
    added_by: 0,
    category_id: 0,
  };
}
</script>

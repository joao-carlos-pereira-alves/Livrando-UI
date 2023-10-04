<template>
  <q-dialog v-model="open" persistent>
    <q-card class="my-card col-md-4 col-xs-12" style="max-width: 42rem;">
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
              <q-input outlined :rules="[rules.required]" v-model="book.title" placeholder="Insira seu nome" />
            </div>
            <div class="q-mb-md col-5">
              <label class="form-label">ISBN</label>
              <q-input outlined v-model="book.isbn" placeholder="Insira o código ISBN" lazy-rules></q-input>
            </div>
            <div class="q-mb-md col-6">
              <label class="form-label">Descrição</label>
              <q-input outlined :rules="[rules.required]" v-model="book.description" placeholder="Insira uma descrição"
                lazy-rules></q-input>
            </div>
            <div class="q-mb-md col-5">
              <label class="form-label">Genêro</label>
              <q-input outlined :rules="[rules.required]" v-model="book.gender" placeholder="Insira o genêro"
                lazy-rules></q-input>
            </div>
            <div class="q-mb-md col-6">
              <label class="form-label">Autor</label>
              <q-input outlined v-model="book.author" placeholder="Insira o autor" lazy-rules></q-input>
            </div>
            <div class="q-mb-md col-5">
              <label class="form-label">Editora</label>
              <q-input outlined v-model="book.publisher" placeholder="Insira o autor" lazy-rules></q-input>
            </div>
            <div class="q-mb-md col-6">
              <label class="form-label">Data de públicação </label>
              <q-input type="date" outlined v-model="book.publicationDate" placeholder="Insira o autor"
                lazy-rules></q-input>
            </div>
            <div class="q-mb-md col-5">
              <label class="form-label">Língua</label>
              <q-input outlined :rules="[rules.required]" v-model="book.lenguage" placeholder="Insira a língua"
                lazy-rules></q-input>
            </div>
            <div class="q-mb-md col-6">
              <label class="form-label">Quantidade</label>
              <q-input type="number" :rules="[rules.required]" outlined v-model="book.quantity"
                placeholder="Insira a quantidade" lazy-rules></q-input>
            </div>
            <div class="q-mb-md col-5">
              <label class="form-label">Tipos de negociação</label>
              <q-select outlined :rules="[rules.required]" v-model="book.negotiationTypes" :options="negotiationTypes"
                option-label="title" label="title" />
            </div>
            <div class="q-mb-md col-6">
              <label class="form-label">Upload Imagem</label>
              <q-input outlined v-model="book.file" placeholder="Insira a capa do livro" lazy-rules>
                <template v-slot:prepend>
                  <q-icon name="upload" color="black" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row justify-end">
            <q-btn label="Cancelar" type="reset" color="grey-7" outline="" class="q-ml-sm text-grey-7 q-mr-sm" />
            <q-btn label="Publicar" type="submit" color="red-10" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  openBookForm: {
    type: Boolean,
    default: true,
  },
})

interface NegotiationTypes {
  title: '',
  id: number,
}

interface Book {
  title: string,
  isbn: string,
  description: string,
  gender: string,
  author: string,
  publisher: string,
  publicationDate: string,
  lenguage: string,
  quantity: number,
  negotiationTypes: Array<NegotiationTypes>,
  file: string
}

const open = computed(() => { return props.openBookForm })

let book = ref({
  title: '',
  isbn: '',
  description: '',
  gender: '',
  author: '',
  publisher: '',
  publicationDate: '',
  lenguage: '',
  quantity: '',
  negotiationTypes: [],
  file: ''
})

const bookForm = ref(null);

const negotiationTypes = ref([
  { title: 'Doação', id: 1 },
  { title: 'Troca', id: 2 },
  { title: 'Empréstimo', id: 3 }
])

const rules = {
  required: (val: string) => (val && val.length > 0) || "Campo obrigatório",
};

function onSubmit() {
  if (!bookForm) return;

  // bookForm.value.validate()
}

function onReset() {
  // book = {
  //   title: '',
  //   isbn: '',
  //   description: '',
  //   gender: '',
  //   author: '',
  //   publisher: '',
  //   publicationDate: '',
  //   lenguage: '',
  //   quantity: '',
  //   negotiationTypes: [{}],
  //   file: '',
  // }
}
</script>

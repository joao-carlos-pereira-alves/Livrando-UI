<template>
  <q-card class="my-card col-md-4 col-xs-12">
    <q-card-section>
      <div class="text-h6 title">Publicar</div>
      <div class="text-subtitle text-grey-9">
        Informe os dados do livro
      </div>
    </q-card-section>
    <q-card-section>
      <q-form ref="loginForm">
        <div class="q-mb-md">
          <label class="form-label">Title</label>
          <q-input outlined v-model="book.title" placeholder="Insira seu nome" />
        </div>
        <div class="q-mb-md">
          <label class="form-label">ISBN</label>
          <q-input outlined v-model="book.isbn" placeholder="Insira o código ISBN" lazy-rules>
            <template v-slot:prepend>
              <q-icon name="mail_outline" color="black" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <label class="form-label">Descrição</label>
          <q-input outlined v-model="book.description" placeholder="Insira uma descrição" lazy-rules>
            <template v-slot:prepend>
              <q-icon name="mail_outline" color="black" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <label class="form-label">Genêro</label>
          <q-input outlined v-model="book.gender" placeholder="Insira o genêro" lazy-rules>
            <template v-slot:prepend>
              <q-icon name="mail_outline" color="black" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <label class="form-label">Autor</label>
          <q-input outlined v-model="book.author" placeholder="Insira o autor" lazy-rules>
            <template v-slot:prepend>
              <q-icon name="mail_outline" color="black" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <label class="form-label">Editora</label>
          <q-input outlined v-model="book.publisher" placeholder="Insira o autor" lazy-rules>
            <template v-slot:prepend>
              <q-icon name="mail_outline" color="black" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <label class="form-label">Data de públicação </label>
          <q-input type="date" outlined v-model="book.publisher" placeholder="Insira o autor" lazy-rules>
            <template v-slot:prepend>
              <q-icon name="mail_outline" color="black" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <label class="form-label">Língua</label>
          <q-input outlined v-model="book.publisher" placeholder="Insira o autor" lazy-rules>
            <template v-slot:prepend>
              <q-icon name="mail_outline" color="black" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <label class="form-label">Quantidade</label>
          <q-input outlined v-model="book.publisher" placeholder="Insira o autor" lazy-rules>
            <template v-slot:prepend>
              <q-icon name="mail_outline" color="black" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <label class="form-label">Aberto para</label>
          <q-input outlined v-model="book.publisher" placeholder="Insira o autor" lazy-rules>
            <template v-slot:prepend>
              <q-icon name="mail_outline" color="black" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-md">
          <label class="form-label">Upload Imagem</label>
          <q-input outlined v-model="book.publisher" placeholder="Insira o autor" lazy-rules>
            <template v-slot:prepend>
              <q-icon name="mail_outline" color="black" />
            </template>
          </q-input>
        </div>

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()

const book = ref({
  title: '',
  isbn: '',
  description: '',
  gender: '',
  author: '',
  publisher: '',
  publicationDate: '',
  lenguage: '',
  quantity: '',
  NegotiationTypes: [{}]
})

function onSubmit() {
  if (book.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    })
  }
  else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
  }
}

function onReset() {
  book = {
    title: '',
    isbn: '',
    description: '',
    gender: '',
    author: '',
    publisher: '',
    publicationDate: '',
    lenguage: '',
    quantity: '',
    NegotiationTypes: [{}]
  }
}
</script>

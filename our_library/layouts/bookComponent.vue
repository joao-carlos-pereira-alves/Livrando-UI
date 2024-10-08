<template>
  <q-card class="shadow-0">
    <UpdateBookComponent
      v-model:open="updateBookDialog"
      :book="book"
      :categories="categories"
      v-if="updateBookDialog"
    />
    <DeleteBookComponent
      v-model:open="deleteBookDialog"
      :book="book"
      @deleted="emitDeletedEvent"
      v-if="deleteBookDialog"
    />
    <q-card-section class="book-card q-pa-lg row items-center justify-center">
      <q-img
        :src="book?.image?.url ? baseUrl + book.image.url : noImage"
        spinner-color="white"
        class="image"
        fit="contain"
      />
    </q-card-section>
    <q-card-section class="row q-pl-none">
      <div class="col-12 q-mb-sm row items-center">
        <div class="col-8">
          <q-rating
            v-model="book.rating"
            class="q-mt-sm"
            size="1.8em"
            :max="5"
            color="yellow"
            disable
            @click="openRatingDialog = true"
          />
        </div>
        <div class="col-4 text-right" v-if="book?.added_by_me">
          <q-icon
            name="edit"
            size="sm"
            class="link"
            @click="updateBookDialog = true"
          >
            <q-tooltip> Editar </q-tooltip>
          </q-icon>
          <q-icon
            name="delete"
            color="red"
            size="sm"
            class="link"
            @click="deleteBookDialog = true"
          >
            <q-tooltip> Excluir </q-tooltip>
          </q-icon>
        </div>
      </div>
      <div class="col-12 row">
        <div
          class="col-6 col-sm-2 col-md-2 q-pr-sm text-start"
          v-for="category in book.categories"
          :key="category"
          :class="{ 'q-mr-md': $q.screen.xs }"
        >
          <q-badge class="text-center" style="font-size: 12px">
            {{ category }}
          </q-badge>
        </div>
      </div>
      <div class="col-12">{{ book.title }}</div>
      <div class="col-12">
        <small> by {{ book.author }} </small>
      </div>
      <div
        class="col-6 text-red-10 text-weight-bold link"
        @click="$emit('trade', book)"
        v-if="!book.added_by_me"
      >
        {{
          book?.status == "completed" && book?.amount <= 0
            ? "Negociado"
            : negotiationTypes[book.negotiation_type]
        }}
      </div>
      <div class="col-6 text-grey text-weight-bold flex" v-else>
        <div class="">
          {{
            book?.status == "completed"
              ? "Negociado"
              : negotiationTypes[book.negotiation_type]
          }}
        </div>
      </div>
      <div class="col-6 text-right">
        <q-icon
          @click="handle_like()"
          class="link"
          :name="liked ? 'favorite' : 'favorite_outline'"
          size="sm"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { toRefs, ref, onMounted } from "vue";
import { authentication } from "../store/modules/authentication";
import NoImage from "../public/images/no_image.png";
import UpdateBookComponent from "../components/UpdateBookComponent.vue";
import DeleteBookComponent from "../components/DeleteBookComponent.vue";
import Swal from "sweetalert2";

export default {
  props: {
    book: {
      required: true,
      type: Object,
    },
    categories: {
      required: true,
      type: Array,
    },
  },
  components: {
    NoImage,
    UpdateBookComponent,
    DeleteBookComponent,
  },
  setup(props, context) {
    const config = useRuntimeConfig();
    const { book } = toRefs(props);
    const { _auth } = authentication();
    const liked = ref(false);
    const user_id = _auth.id;
    const negotiationTypes = {
      replacement: "Troca",
      loan: "Empréstimo",
      donation: "Doação",
    };
    const baseUrl = config.public.baseURL.replace("/api/v1", "");
    const noImage = NoImage;
    const updateBookDialog = ref(false);
    const deleteBookDialog = ref(false);

    const emitDeslikeEvent = (book_id) => {
      context.emit("deslike", book_id);
    };

    const emitDeletedEvent = (book_id) => {
      context.emit("deleted", book_id);
    };

    const like = async () => {
      try {
        await useApi("/favorite_books", {
          method: "post",
          body: {
            favorite_book: {
              user_id: user_id,
              book_id: book.value.id,
            },
          },
          lazy: true,
        });

        liked.value = true;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Livro adicionado como favorito com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        if (error?.value?.data?.errors) {
          const errors = error.value.data.errors;
          const errorMessages = [];

          Object.keys(errors).forEach((key) => {
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
            errors[key].forEach((error) => {
              const errorMessage = `${formattedKey}: ${error}`;
              errorMessages.push(errorMessage);
            });
          });

          Swal.fire({
            position: "top-end",
            icon: "error",
            title: errorMessages.join("\n."),
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    };

    const deslike = async () => {
      try {
        const book_id = book.value.id;
        await useApi(`/favorite_books/deslike`, {
          method: "post",
          params: {
            book_id: book_id,
          },
          lazy: true,
        });

        liked.value = false;
        emitDeslikeEvent(book_id);
      } catch (error) {
        console.error(error);
      }
    };

    const handle_like = () => {
      if (book.value?.liked || liked.value) {
        deslike();
      } else {
        like();
      }
    };

    const unshiftBook = (book_id) => {};

    onMounted(() => {
      liked.value = book.value?.favorited;
    });

    return {
      negotiationTypes,
      like,
      deslike,
      liked,
      handle_like,
      baseUrl,
      noImage,
      updateBookDialog,
      deleteBookDialog,
      emitDeletedEvent,
    };
  },
};
</script>

<style scoped>
.book-card {
  background-color: rgb(135, 207, 189);
  min-height: 300px;
  min-width: 200px;
}

.image {
  position: relative;
  margin-top: -40px;
  height: 300px;
  transform: skewY(
    -2deg
  ); /* Inclinação para cima, ajuste o ângulo conforme necessário */
  transform-origin: top;
}
</style>

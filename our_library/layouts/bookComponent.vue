<template>
  <q-card class="shadow-0">
    <q-card-section class="book-card q-pa-lg row items-center justify-center">
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg"
        spinner-color="white"
        class="image"
      />
    </q-card-section>
    <q-card-section class="row">
      <div class="col-12">{{ book.title }}</div>
      <div class="col-12">
        <small> by {{ book.author }} </small>
      </div>
      <div class="col-6 text-red-10 text-weight-bold" @click="$emit('trade', book)">
        {{ negotiationTypes[book.negotiation_type] }}
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

export default {
  props: {
    book: {
      required: true,
      type: Object,
    },
  },
  setup(props, context) {
    const { book } = toRefs(props);
    const { _auth } = authentication();
    const liked = ref(false);
    const user_id = _auth.id;
    const negotiationTypes = {
      replacement: "Troca",
      loan: "Empréstimo",
      donation: "Doação",
    };

    const emitDeslikEvent = (book_id) => {
      context.emit('deslike', book_id);
    };

    const like = async () => {
      try {
        await useApi("/favorite_books", {
          method: "post",
          body: {
            favorite_book: {
              user_id: user_id,
              book_id: book.value.id
            }
          },
          lazy: true
        });

        liked.value = true;
      } catch (error) {
        console.error(error);
      }
    };

    const deslike = async () => {
      try {
        const book_id = book.value.id;
        await useApi(`/favorite_books/deslike`, {
          method: "post",
          params: {
            book_id: book_id
          },
          lazy: true,
        });

        liked.value = false;
        emitDeslikEvent(book_id)
      } catch (error) {
        console.error(error);
      }
    };

    const handle_like = () => {
      if (book.value?.liked || liked.value) {
        deslike();
      } else {
        like()
      }
    }

    onMounted(() => {
      liked.value = book.value?.favorited;
    });

    return {
      negotiationTypes,
      like,
      deslike,
      liked,
      handle_like
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

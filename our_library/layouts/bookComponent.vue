<template>
  <q-card class="shadow-0">
    <q-card-section class="book-card q-pa-lg row items-center justify-center">
      <q-img
        :src="book?.image?.url ? baseUrl + book.image.url : noImage"
        spinner-color="white"
        class="image"
      />
    </q-card-section>
    <q-card-section class="row q-pl-none">
      <div class="col-12 row">
        <div class="col-4 col-md-3 q-pr-sm" v-for="category in book.categories" :key="category">
          <q-badge class="full-width text-center" style="font-size: 12px;">
            {{ category }}
          </q-badge>
        </div>
      </div>
      <div class="col-12">{{ book.title }}</div>
      <div class="col-12">
        <small> by {{ book.author }} </small>
      </div>
      <div class="col-6 text-red-10 text-weight-bold link" @click="$emit('trade', book)" v-if="!book.added_by_me">
        {{ book?.status == 'completed' && book?.amount <= 0 ? 'Negociado' : negotiationTypes[book.negotiation_type] }}
      </div>
      <div class="col-6 text-grey text-weight-bold flex" v-else>
        <div class="">
          {{ book?.status == 'completed' ? 'Negociado' : negotiationTypes[book.negotiation_type] }}
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
import NoImage from '../public/images/no_image.png'

export default {
  props: {
    book: {
      required: true,
      type: Object,
    },
  },
  components: {
    NoImage
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
    const baseUrl = config.public.baseURL.replace('/api/v1', '')
    const noImage = NoImage
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
      handle_like,
      baseUrl,
      noImage
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

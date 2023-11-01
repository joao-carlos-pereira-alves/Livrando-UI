<template>
  <q-dialog v-model="openDialog" persistent>
    <q-card>
      <q-card-section class="row justify-center">
        <div class="col-12 text-weight-bold text-subtitle1 text-center">
          Tem certeza que deseja avaliar o livro {{ book?.title || "" }} em
          {{ rating > 1 ? `${rating} estrelas` : `${rating} estrela` }}?
        </div>
        <div class="col-12 text-center q-my-sm" style="background-color: rgba(0, 0, 0, 0.1); border-radius: 10px; width: 80%;">
          <q-rating
            v-model="ratingComputed"
            class="q-pa-sm"
            size="1.8em"
            :max="5"
            color="yellow"
          />
        </div>
        <div class="col-12 row justify-end">
          <q-btn outline @click="closeDialog" color="grey" class="q-mr-sm"> Cancelar </q-btn>
          <q-btn dense @click="createRating(book.id, rating)" color="green"> Confirmar </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { authentication } from '~/store/modules/authentication';

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
    rating: {
      required: true
    },
    categories: {
      type: Array,
      required: true,
      default: [],
    },
  },
  setup(_, { emit }) {
    const { $swal } = useNuxtApp();
    const { _auth } = authentication();

    const closeDialog = () => {
      emit("update:open", false);
    };

    const createRating = async (book_id, rating) => {
      try {
        const { status, error } = await useApi("/ratings", {
          method: "post",
          body: {
            rating: {
              rating: rating,
              evaluable_id: book_id,
              evaluable_type: 'Book',
              evaluator_id: _auth.id
            }
          },
        });

        if (status?.value == "success") emit("evaluated");

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

          closeDialog();
        }
      } catch (err) {
        console.log(err);
      }
    };

    return {
      createRating,
      closeDialog,
    };
  },
  computed: {
    openDialog() {
      return this.open || false;
    },
    ratingComputed: {
      get() {
        return this.rating || 0
      },
      set(new_value) {
        return this.$emit('update:rating', new_value)
      }
    }
  },
};
</script>

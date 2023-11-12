<template>
  <q-dialog v-model="openDialog" persistent>
    <q-card style="width: 400px;">
      <q-card-section class="row justify-center">
        <div class="col-12 text-weight-bold text-subtitle1 text-center">
          Tem certeza que deseja excluir o livro {{ book?.title || "" }} ?
        </div>
        <div class="col-12 text-center">
          Essa ação é irreversível.
        </div>
        <div class="col-12 row justify-end q-mt-lg">
          <q-btn outline @click="closeDialog" color="grey" class="q-mr-sm">
            Cancelar
          </q-btn>
          <q-btn dense @click="deleteBook(book.id)" color="red">
            Excluir
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { authentication } from "~/store/modules/authentication";

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
    }
  },
  setup(_, { emit }) {
    const { $swal } = useNuxtApp();
    const { _auth } = authentication();

    const closeDialog = () => {
      emit("update:open", false);
    };

    const deleteBook = async (book_id) => {
      try {
        const { status } = await useApi(`/books/${book_id}`, {
          method: "delete",
        });

        if (status?.value == "success") {
          emit("deleted", book_id)
          $swal.fire({
            position: "top-end",
            icon: "success",
            title: "Livro excluído com sucesso!",
            showConfirmButton: false,
            timer: 3000,
          });
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

          closeDialog();
        }
      } catch (err) {
        console.log(err);
      }
    };

    return {
      closeDialog,
      deleteBook
    };
  },
  computed: {
    openDialog() {
      return this.open || false;
    }
  },
};
</script>

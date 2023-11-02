<template>
  <q-dialog v-model="openDialog" persistent>
    <q-card style="min-width: min(85vw, 500px)">
      <q-card-section class="text-red-10 text-weight-bold">
        Deseja denunciar o usuário
        {{ reportedUser?.name || "nome não encontrado." }}
      </q-card-section>
      <q-card-section>
        <q-form class="row" ref="reportForm" lazy-validation>
          <div class="col-12">
            <label class="form-label">Motivo</label>
            <q-select
              outlined
              :rules="[rules.required]"
              v-model="report.reason"
              :options="reportReasons"
              option-label="title"
              label="Selecione um motivo"
              color="secondary"
              lazy-rules
              dense
            />
          </div>
          <div class="col-12">
            <label class="form-label">Descrição</label>
            <q-input
              outlined
              :rules="[rules.required]"
              v-model="report.description"
              placeholder="Insira uma descrição"
              lazy-rules
              color="secondary"
              dense
            ></q-input>
          </div>
          <div class="col-12 row justify-end">
            <q-btn
              label="Cancelar"
              class="text-grey"
              outline
              style="background-color: rgba(0, 0, 0, 0.1)"
              @click="closeDialog"
            />
            <q-btn
              label="Denunciar"
              type="reset"
              color="red-10"
              class="q-ml-sm q-mr-sm"
              @click="createReport(reportedUser)"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { authentication } from "~/store/modules/authentication";

export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    "reported-user": {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    rules: {
      required: (v) => !!v || "Campo obrigatório",
    },
    reportReasons: [
      { title: "Spam", value: "Spam" },
      { title: "Assédio", value: "Harassment" },
      { title: "Conteúdo inapropriado", value: "Inappropriate Content" },
      { title: "Conta falsa", value: "Fake Account" },
      { title: "Outro", value: "Other" },
    ],
  }),
  setup(_, { emit }) {
    const { $swal } = useNuxtApp();
    const { _auth } = authentication();
    const report = ref({
      reason: null,
      description: null,
    });
    const reportForm = ref(null);

    const closeDialog = () => {
      emit("update:open", false);
    };

    const createReport = async (reported_user) => {
      if (!reportForm) return;

      reportForm.value.validate().then(async (res) => {
        if (res && process.client) {
          try {
            const { data, status, error } = await useApi("/reports", {
              method: "post",
              body: {
                report: {
                  reporter_id: _auth.id,
                  reported_user_id: reported_user.id,
                  reason: report.value.reason,
                  description: report.value.description,
                },
              },
            });

            if (status?.value == "success") {
              if (data?.value?.reporter) {
                $swal.fire({
                  position: "center",
                  icon: "error",
                  title: data?.value?.reporter,
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                $swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Usuário denunciado com sucesso!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
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
            }

            closeDialog();
          } catch (err) {
            console.log(err);
          }
        }
      });
    };

    return {
      createReport,
      closeDialog,
      reportForm,
      report,
    };
  },
  methods: {},
  computed: {
    openDialog() {
      return this.open || false;
    },
  },
};
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn class="full-width" style="height: 45px;" label="Relatório" color="red-10" @click="report = true" />

    <q-dialog v-model="report">
      <q-skeleton
        class="col-12 col-sm-12 col-md-2"
        type="QToolbar"
        :class="{ 'q-mt-sm': $q.screen.xs || $q.screen.sm }"
        v-if="loadingDOM"
      />

      <q-card>
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-right">Status</th>
              <th class="text-right">Livro</th>
              <th class="text-right">Categoria</th>
              <th class="text-right">Data de negociação</th>
              <th class="text-right">Negociador</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="negotiation in negotiations" :key="negotiation.id">
              <td class="text-left">{{ getStatus(negotiation.status) }}</td>
              <td class="text-left">{{ negotiation.book?.title }}</td>
              <td class="text-left">{{ getCategory(negotiation.category) }}</td>
              <td class="text-left">{{ negotiation.negociation_date }}</td>
              <td class="text-left">{{ negotiation.negotiator_name }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { authentication } from "../store/modules/authentication";

export default {
  data: () => ({
    loadingDOM: true,
    report: false,
    negotiations: [],
  }),
  setup() {
    const { _auth } = authentication();
  },
  methods: {
    getStatus(status) {
      if (status == "pending") return "Pendente";
      if (status == "accepted") return "Aceita";
      if (status == "completed") return "Completa";
    },
    getCategory(category) {
      if (category == "replacement") return "Empréstimo";
      if (category == "loan") return "Troca";
      if (category == "donation") return "Doação";
    },
    async getNegociations() {
      try {
        const { data, execute } = await useApi("/trades", {
          method: "get",
          lazy: true,
        });

        await execute();

        if (data?.value) {
          this.negotiations = data.value;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.loadingDOM = false;
    this.getNegociations();
  },
};
</script>

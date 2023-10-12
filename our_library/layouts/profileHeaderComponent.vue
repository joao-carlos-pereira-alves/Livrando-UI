<template>
  <q-card class="shadow-0 q-pa-md">
    <q-card-section>
      <q-form ref="userUpdateForm" class="row items-center justify-center">
        <div
          class="col-12 col-sm-12 col-md-12 col-lg row justify-center items-center"
          :class="{ 'q-mb-md': $q.screen.xs || $q.screen.sm || $q.screen.md }"
        >
          <q-skeleton
            type="QAvatar"
            class="text-subtitle1"
            style="height: 100px; width: 100px"
            v-if="loadingDOM"
          />
          <q-avatar
            size="100px"
            class="text-white text-caption"
            v-else
            style="background-color: #badcc8"
          >
            {{ name_abbreviation() }}
          </q-avatar>
        </div>
        <div
          class="col-12 col-sm-12 col-md-12 col-lg-11 row items-center q-pt-md"
        >
          <div class="col-12 col-sm-12 col-md-6 col-lg-2 q-px-sm">
            <q-skeleton
              type="QToolbar"
              class="text-subtitle1"
              style="height: 40px"
              v-if="loadingDOM"
            />
            <q-input
              v-else
              type="text"
              outlined
              label="Nome"
              placeholder="Insira um nome"
              lazy-rules
              v-model="user.name"
              dense
              :rules="[rules.required]"
              :disable="!editable"
              @keypress.enter="onSubmit"
            />
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-2 q-px-sm">
            <q-skeleton
              type="QToolbar"
              class="text-subtitle1"
              style="height: 40px"
              v-if="loadingDOM"
            />
            <q-input
              v-else
              type="text"
              outlined
              label="E-mail"
              placeholder="Insira um e-mail"
              lazy-rules
              v-model="user.name"
              dense
              :rules="[rules.required]"
              :disable="!editable"
              @keypress.enter="onSubmit"
            />
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-2 q-px-sm">
            <q-skeleton
              type="QToolbar"
              class="text-subtitle1"
              style="height: 40px"
              v-if="loadingDOM"
            />
            <q-input
              v-else
              type="password"
              outlined
              label="Senha"
              placeholder="**********"
              lazy-rules
              v-model="user.name"
              dense
              :disable="!editable"
              :rules="[rules.required]"
              @keypress.enter="onSubmit"
            />
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-2 q-px-sm">
            <q-skeleton
              type="QToolbar"
              class="text-subtitle1"
              style="height: 40px"
              v-if="loadingDOM"
            />
            <q-input
              v-else
              type="text"
              outlined
              mask="(##) # ####-####"
              label="Celular"
              placeholder="Insira um Celular"
              lazy-rules
              v-model="user.phone"
              dense
              :rules="[rules.required]"
              :disable="!editable"
              @keypress.enter="onSubmit"
            />
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-2 q-px-sm">
            <q-skeleton
              type="QToolbar"
              class="text-subtitle1"
              style="height: 40px"
              v-if="loadingDOM"
            />
            <q-input
              v-else
              dense
              outlined
              lazy-rules
              v-model="user.birth_date"
              mask="date"
              :rules="['date']"
              :disable="!editable"
              placeholder="0000/00/00"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="user.birth_date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-2 q-px-sm">
            <q-skeleton
              type="QToolbar"
              class="text-subtitle1"
              style="height: 40px"
              v-if="loadingDOM"
            />
            <q-input
              v-else
              type="text"
              outlined
              label="CPF"
              placeholder="Insira um CPF"
              lazy-rules
              v-model="user.cpf"
              dense
              :mask="editable ? '###.###.###-##' : ''"
              :rules="[rules.required]"
              :disable="!editable"
              @keypress.enter="onSubmit"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data: () => ({
    user: {
      name: "João Carlos",
      password: null,
      birth_date: "",
    },
    rules: {
      required: (v) => !!v || "Campo obrigatório",
    },
    loadingDOM: true,
    editable: false
  }),
  methods: {
    name_abbreviation() {
      const [name, surname] = this.user.name.split(" ");

      return name.charAt(0) + surname.charAt(0);
    },
    async get_user() {
      try {
        const { data, execute } = await useApi("/show_user_with_uuid/" + this.$route.query.uuid, {
          method: "get",
          lazy: true,
        });

        await execute();

        if (data?.value) {
          this.user = data.value;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.loadingDOM = false;
    this.get_user();
  },
};
</script>

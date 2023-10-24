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
          <q-btn
            style="position: absolute; top: 80px; margin-left: 1.5rem"
            round
            color="red-10"
            icon="edit"
            @click="editable = true"
          />
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
              color="secondary"
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
              v-model="user.email"
              dense
              :rules="[rules.required]"
              :disable="!editable"
              @keypress.enter="onSubmit"
              color="secondary"
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
              v-model="user.password"
              dense
              :disable="!editable"
              :rules="[rules.required]"
              @keypress.enter="onSubmit"
              color="secondary"
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
              :mask="editable ? '(##) # ####-####' : ''"
              label="Celular"
              placeholder="Insira um Celular"
              lazy-rules
              v-model="user.phone"
              dense
              :rules="[rules.required]"
              :disable="!editable"
              @keypress.enter="onSubmit"
              color="secondary"
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
              color="secondary"
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
              color="secondary"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { authentication } from "../store/modules/authentication";

const rules = {
  required: (v) => !!v || "Campo obrigatório",
};

let loadingDOM = ref(true);
const editable = ref(false);
const { _auth } = authentication();
const user = ref(_auth);

function name_abbreviation() {
  const [name, surname] = user.value.name.split(" ");
  return name.charAt(0) + surname.charAt(0);
}

async function onSubmit() {
  try {
    const { data } = await useApi("/users/" + user.value.id, {
      method: "put",
      lazy: true,
      body: { user: user },
      format: "json",
    });

    if (data?.value) {
      user = data.value;
    }
  } catch (error) {
    console.error(error);
  }
}

onBeforeMount(() => {
  loadingDOM = false;
});
</script>

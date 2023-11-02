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
            v-model="user.avatar"
          >
            <q-img
              :src="user?.avatar?.url ? baseUrl + user.avatar.url : NoImage"
              spinner-color="white"
              class="image"
            >
            </q-img>
          </q-avatar>
          <q-btn
            style="position: absolute; top: 88px; margin-left: 1.5rem"
            round
            color="red-10"
            icon="edit"
            dense
            @click="editable = true"
          />
        </div>
        <div
          class="col-12 col-sm-12 col-md-12 col-lg-11 row items-start q-pt-md"
        >
          <div class="col-12 col-sm-12 col-md-6 col-lg-3 q-px-sm">
            <q-file
              outlined
              v-model="user.avatar"
              :rules="[(v) => !!v || 'Campo obrigatório']"
              max-files="1"
              accept="image/*"
              label="Foto de perfil"
              lazy-rules
              color="secondary"
              dense
              :disable="!editable"
            >
              <template v-slot:prepend>
                <q-icon name="upload" color="secondary" />
              </template>
            </q-file>
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-3 q-px-sm">
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
          <div class="col-12 col-sm-12 col-md-6 col-lg-3 q-px-sm">
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
            >
              <template v-slot:prepend>
                <q-icon name="mail_outline" color="black" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-3 q-px-sm">
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
              @keypress.enter="onSubmit"
              color="secondary"
            />
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-3 q-px-sm" :class="{ 'q-mt-md': $q.screen.sm || $q.screen.xs }">
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
          <div class="col-12 col-sm-12 col-md-6 col-lg-3 q-px-sm">
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
          <div class="col-12 col-sm-12 col-md-6 col-lg-3 q-px-sm">
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
import { ref, onMounted } from "vue";
import { authentication } from "../store/modules/authentication";
import NoImage from "../public/images/user_not_found.png";

const rules = {
  required: (v) => !!v || "Campo obrigatório",
};

const { $swal } = useNuxtApp();
const config = useRuntimeConfig();
const loadingDOM = ref(true);
const editable = ref(false);
const { _auth, updateUser } = authentication();
const user = ref(_auth);
const baseUrl = config.public.baseURL.replace("/api/v1", "");

function isFile(input) {
  return input instanceof File;
}

async function onSubmit() {
  if (!isFile(user?.value?.avatar)) delete user.value.avatar;
  if (user?.value?.avatar?.length) user.value.avatar = user.value.avatar[0];

  const form = Object.entries(user.value).reduce((acc, [key, value]) => {
    if (value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {});

  const formData = new FormData();

  Object.keys(form).forEach((key) => {
    formData.append(`user[${key}]`, form[key]);
  });

  try {
    const { data, status, error } = await useApi("/users/" + user.value.id, {
      method: "put",
      lazy: true,
      body: formData,
    });

    if (status?.value == "success") {
      $swal.fire({
        position: "center",
        icon: "success",
        title: "Usuário atualizado!",
        showConfirmButton: false,
        timer: 1500,
      });

      if (data?.value) {
        user.value = data.value;
        updateUser(user.value);
      }
    }

    if (status?.value == "error") {
      if (error?.value?.data) {
        $swal.fire({
          position: "top-end",
          icon: "error",
          title: "Por favor, envie valores válidos.",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  loadingDOM.value = false;
});
</script>

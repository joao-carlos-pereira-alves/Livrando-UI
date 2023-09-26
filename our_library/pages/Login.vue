<template>
  <div class="q-pa-md col-12 row q-gutter-md items-center">
    <q-card class="my-card col-md-4 col-xs-12">
      <q-card-section>
        <span class="welcome text-grey-9">Bem-vindo !</span>
        <div class="text-h6 title">Sign in</div>
        <div class="text-subtitle text-grey-9">
          Informe seus dados de acesso
        </div>
      </q-card-section>
      <q-card-section>
        <q-form ref="loginForm">
          <div class="q-mb-md" v-if="!isLoginAction">
            <label class="form-label">Nome</label>
            <q-input
              outlined
              v-model="userAthentication.name"
              placeholder="Insira seu nome"
            />
          </div>
          <div class="q-mb-md">
            <label class="form-label">Email</label>
            <q-input
              type="email"
              outlined
              v-model="userAthentication.email"
              placeholder="Insira seu e-mail"
              lazy-rules
              :rules="[rules.required, rules.email]"
              @keypress.enter="onSubmit"
            >
              <template v-slot:prepend>
                <q-icon name="mail_outline" color="black" />
              </template>
            </q-input>
          </div>
          <div class="q-mb-md">
            <label class="form-label">Senha</label>
            <q-input
              type="password"
              outlined
              v-model="userAthentication.password"
              placeholder="Insira sua senha"
              lazy-rules
              :rules="[rules.required]"
              @keypress.enter="onSubmit"
            >
              <template v-slot:prepend>
                <q-icon name="lock_outline" color="black" />
              </template>
            </q-input>
          </div>
          <div class="q-mb-md" v-if="!isLoginAction">
            <label class="form-label">Confirmar Senha</label>
            <q-input
              type="password"
              outlined
              v-model="userAthentication.confirmPassword"
              label="Insira sua senha"
            />
          </div>
          <div class="row">
            <div class="col-6">
              <q-checkbox color="red-10" v-model="userAthentication.remember" />
              <span class="form-checkbox-label">Lembre-se de mim</span>
            </div>
            <div class="col-6" style="text-align: center; margin-top: 0.6em">
              <span class="form-checkbox-label">Esqueceu a senha ?</span>
            </div>
          </div>
          <div class="col-3 form-actions">
            <q-btn
              class="bg-red-10 text-grey-1 col-12"
              style="margin-bottom: 2em"
              @click="onSubmit"
            >
              {{ isLoginAction ? "Login" : "Cadastrar" }}
            </q-btn>
            <span align="center" class="col-12 form-actions-label">
              {{
                isLoginAction
                  ? "Você não tem uma conta?"
                  : "Você já tem uma conta ?"
              }}
              <a>{{ isLoginAction ? "Cadastrar" : "Login" }}</a>
            </span>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <div class="col-7">
      <q-img
        src="../public/images/login-ilustration.svg"
        class="q-ml-xl"
        spinner-color="white"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { authentication } from "../store/modules/authentication";

const { login } = authentication();
const loginForm = ref(null);
const props = defineProps({
  isLoginAction: {
    type: Boolean,
    default: true,
  },
});
const userAthentication = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  remember: false,
});
const emailPattern =
  /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
const rules = {
  required: (val: string) => (val && val.length > 0) || "Campo obrigatório",
  email: (val: string) => emailPattern.test(val) || "E-mail inválido",
};

const onSubmit = () => {
  if (!loginForm) return;

  loginForm.value.validate().then((res: boolean) => {
    if (res) {
      if (process.client) {
        login(userAthentication.value);
      }
    }
  });
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Petrona:wght@500&family=Poppins:ital,wght@0,400;0,500;1,700&family=Roboto+Mono:wght@700&family=Roboto:wght@400;500;700&display=swap");

.welcome {
  font-family: Poppins;
  font-size: 25px;
  font-style: normal;
  line-height: normal;
  font-weight: 400;
}

.title {
  color: #000;
  font-family: Poppins;
  font-size: 31px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.form-label {
  color: #000;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.form-checkbox-label {
  color: #000;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

.form-actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 2em;
}

.form-actions-label {
  color: #7d7d7d;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
</style>

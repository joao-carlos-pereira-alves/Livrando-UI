<template>
  <q-page padding :class="{ 'background-image row items-center': !loadingDOM }">
    <div class="overlay" v-if="loadingDOM">
      <q-circular-progress
        indeterminate
        rounded
        size="50px"
        color="lime-5"
        class="q-ma-md"
      />
    </div>
    <q-card class="" style="width: min(85vw, 500px)" v-else>
      <q-card-section>
        <span class="welcome text-grey-9">Bem-vindo !</span>
        <div class="text-h6 title">Sign in</div>
        <div class="text-subtitle text-grey-9">
          Informe seus dados de acesso
        </div>
      </q-card-section>
      <q-card-section>
        <q-form ref="loginForm">
          <div v-if="!isLoginAction">
            <label class="form-label">Nome</label>
            <q-input
              v-model="userAthentication.name"
              :rules="[rules.required]"
              outlined
              dense
              placeholder="Insira seu nome"
            />
          </div>
          <div v-if="!isLoginAction">
            <label class="form-label">CPF</label>
            <q-input
              outlined
              v-model="userAthentication.cpf"
              placeholder="000.000.000-00"
              mask="###.###.###-##"
              :rules="[rules.required]"
              dense
            />
          </div>
          <div>
            <label class="form-label">Email</label>
            <q-input
              type="email"
              outlined
              v-model="userAthentication.email"
              placeholder="Insira seu e-mail"
              lazy-rules
              :rules="[rules.required, rules.email]"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="mail_outline" color="black" />
              </template>
            </q-input>
          </div>
          <div v-if="!isLoginAction">
            <label class="form-label">Telefone</label>
            <q-input
              outlined
              v-model="userAthentication.phone"
              placeholder="(00) 0 0000-0000"
              mask="(##) # ####-####"
              :rules="[rules.required]"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="phone" color="black" />
              </template>
            </q-input>
          </div>
          <div>
            <label class="form-label">Senha</label>
            <q-input
              type="password"
              outlined
              v-model="userAthentication.password"
              placeholder="Insira sua senha"
              lazy-rules
              :rules="[rules.required]"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="lock_outline" color="black" />
              </template>
            </q-input>
          </div>
          <div v-if="!isLoginAction">
            <label class="form-label">Confirmar Senha</label>
            <q-input
              v-model="userAthentication.password_confirmation"
              :rules="[rules.required, rules.confirmPasswordMatch]"
              type="password"
              outlined
              label="Insira sua senha"
              dense
              ><template v-slot:prepend>
                <q-icon name="lock_outline" color="black" />
              </template>
            </q-input>
          </div>
          <div class="row">
            <!-- <div class="col-6">
                  <q-checkbox
                    color="red-10"
                    v-model="userAthentication.remember"
                  />
                  <span class="form-checkbox-label">Lembre-se de mim</span>
                </div> -->
            <!-- <div class="col-6" style="text-align: center; margin-top: 0.6em">
                  <span class="form-checkbox-label">Esqueceu a senha ?</span>
                </div> -->
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
              <q-btn
                flat
                color="red-10"
                @click="isLoginAction = !isLoginAction"
                :label="isLoginAction == true ? 'Cadastrar' : 'Login'"
              />
            </span>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { authentication } from "../store/modules/authentication";
import { onMounted } from "vue";

const { login } = authentication();
const { register } = authentication();
const loadingDOM = ref(true);
const loginForm = ref(null);
const isLoginAction = ref(true);
const userAthentication = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  remember: false,
  cpf: "",
  phone: "",
});
const emailPattern =
  /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
const rules = {
  required: (val: string) => (val && val.length > 0) || "Campo obrigatório",
  email: (val: string) => emailPattern.test(val) || "E-mail inválido",
  confirmPasswordMatch: (val: string) =>
    val === userAthentication.value.password || "As senhas não coincidem",
};

const onSubmit = () => {
  if (!loginForm) return;

  if (isLoginAction.value === false) {
    loginForm.value.validate().then(async (res: boolean) => {
      if (res && process.client) {
        register(userAthentication.value);
      }
    });
  } else {
    loginForm.value.validate().then(async (res: boolean) => {
      if (res && process.client) {
        await login(userAthentication.value);
      }
    }).catch((e) => e);
  }

  loginForm.value.resetValidation();
};

onMounted(() => {
  loadingDOM.value = false;
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Petrona:wght@500&family=Poppins:ital,wght@0,400;0,500;1,700&family=Roboto+Mono:wght@700&family=Roboto:wght@400;500;700&display=swap");

.background-image {
  background-image: url("../public/images/login-ilustration.svg");
  background-repeat: no-repeat;
  background-position: right center;
}

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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.7
  ); /* Cor de fundo e opacidade do overlay */
  display: flex;
  justify-content: center; /* Centralizar horizontalmente */
  align-items: center; /* Centralizar verticalmente */
  z-index: 9999; /* Certifique-se de que o overlay esteja na parte superior */
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

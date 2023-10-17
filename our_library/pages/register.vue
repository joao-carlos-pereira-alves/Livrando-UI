<template>
  <div class="q-pa-md col-12 row q-gutter-md items-center">
    <q-card class="my-card col-md-4 col-xs-12">
      <q-card-section>
        <span class="welcome text-grey-9">Bem-vindo!</span>
        <div class="text-h6 title">Sign Up</div>
        <div class="text-subtitle text-grey-9">
          Cadastre suas informações
        </div>
      </q-card-section>
      <q-card-section>
        <q-form ref="registrationForm">
          <div class="q-mb-md">
            <label class="form-label">Nome</label>
            <q-input outlined v-model="userAuthentication.name" placeholder="Insira seu nome" />
          </div>
          <div class="q-mb-md">
            <label class="form-label">Email</label>
            <q-input type="email" outlined v-model="userAuthentication.email" placeholder="Insira seu e-mail" lazy-rules
              :rules="[rules.required, rules.email]" @keypress.enter="onSubmit">
              <template v-slot:prepend>
                <q-icon name="mail_outline" color="black" />
              </template>
            </q-input>
          </div>
          <div class="q-mb-md">
            <label class="form-label">Senha</label>
            <q-input type="password" outlined v-model="userAuthentication.password" placeholder="Insira sua senha"
              lazy-rules :rules="[rules.required]" @keypress.enter="onSubmit">
              <template v-slot:prepend>
                <q-icon name="lock_outline" color="black" />
              </template>
            </q-input>
          </div>
          <div class="q-mb-md">
            <label class="form-label">Confirmar Senha</label>
            <q-input type="password" outlined v-model="userAuthentication.confirmPassword" placeholder="Insira sua senha"
              lazy-rules :rules="[rules.required]" @keypress.enter="onSubmit">
              <template v-slot:prepend>
                <q-icon name="lock_outline" color="black" />
              </template>
            </q-input>
          </div>
          <div class="row">
          </div>
          <div class="col-3 form-actions">
            <q-btn class="bg-red-10 text-grey-1 col-12" style="margin-bottom: 2em" @click="onSubmit">
              Continuar
            </q-btn>
            <span align="center" class="col-12 form-actions-label">
              Você ja tem uma conta? <a @click="switchToLogin"><b>Login</b></a>
            </span>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <div class="col-7">
      <q-img src="../public/images/login-ilustration.svg" class="q-ml-xl" spinner-color="white" />
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import { authentication } from "../store/modules/authentication";
import { useRouter } from 'vue-router';

const router = useRouter()
const { register } = authentication();
const registrationForm = ref(null);
const props = defineProps({
  isLoginAction: {
    type: Boolean,
    default: false,
  },
});
const userAuthentication = ref({
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
  if (!registrationForm) return;

  registrationForm.value.validate().then(async (res: boolean) => {
    if (res && process.client) {
      register(userAuthentication.value);
    }
  });
};

const switchToLogin = () => {
  router.push("/login");
};
</script>
  
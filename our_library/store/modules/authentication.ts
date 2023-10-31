/* eslint-disable */
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";
// import { Notify } from "quasar";
import { useRouter } from "#imports";
import Swal from "sweetalert2";

export const authentication = defineStore("authentication", {
  state: () => ({
    _auth: process.client
      ? JSON.parse(localStorage?._auth ? localStorage._auth : "{}")
      : "{}",
  }),
  getters: {
    jwtPayload(): any {
      if (!this?._auth?.token) {
      }

      return jwtDecode(String(this._auth.token));
    },
    isJwtExpired(_state): any {
      return Date.now() >= (this.jwtPayload.exp || 0) * 1000;
    },
  },
  actions: {
    async login(user: Object) {
      const router = useRouter();
      try {
        localStorage._auth = JSON.stringify({});
        this._auth = {};

        const { data, status } = await useApi("/login", {
          method: "post",
          body: {
            user: user,
          },
        });

        if (status?.value == "success") {
          this._auth = data.value;
          localStorage._auth = JSON.stringify(this._auth);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login realizado com sucesso.",
            showConfirmButton: false,
            timer: 1500,
          });

          router.push({
            path: "/",
          });
        }

        if (status?.value == "error") {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "E-mail ou senha inválidos.",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        return true;
      } catch (error) {
        return error;
      }
    },
    async register(user: Object) {
      const router = useRouter();

      try {
        localStorage._auth = JSON.stringify({});
        this._auth = {};

        const { error, status } = await useApi("/signup", {
          method: "post",
          body: {
            user: user,
          },
        });

        if (status?.value == "success") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Cadastro realizado com sucesso.",
            showConfirmButton: false,
            timer: 1500,
          });

          router.push({
            path: "/",
          });
        }

        if (error) {
          if (error?.value?.data?.errors) {
            const errors = error.value.data.errors;
            const errorMessages = <any>[];

            Object.keys(errors).forEach((key) => {
              const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
              errors[key].forEach((error: any) => {
                const errorMessage = `${formattedKey}: ${error}`;
                errorMessages.push(errorMessage);
              });
            });

            Swal.fire({
              position: "top-end",
              icon: "error",
              title: errorMessages.join("\n."),
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }

        return true;
      } catch (error) {
        return error;
      }
    },
    async logout() {
      this._auth = {};
      const router = useRouter();
      localStorage.removeItem("_auth");
      router.push({ name: "Login" });
    },
    updateUser(user: Object) {
      this._auth = user;
      localStorage._auth = JSON.stringify(this._auth);
    },
  },
});

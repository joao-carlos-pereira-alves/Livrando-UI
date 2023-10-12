/* eslint-disable */
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";
// import { Notify } from "quasar";
import { useRouter } from '#imports'

export const authentication = defineStore("authentication", {
  state: () => ({
    _auth: process.client ? JSON.parse(localStorage?._auth ? localStorage._auth : "{}") : "{}"
  }),
  getters: {
    jwtPayload(): any {
      if (!(this?._auth?.token)) {
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

        const response = await useApi("/login", {
          method: "post",
          body: {
            user: user
          },
        }
        )

        this._auth = response.data;
        localStorage._auth = JSON.stringify(this._auth);

        // Notify.create({
        //   color: "positive",
        //   message: "Login realizado com sucesso",
        //   icon: "thumb_up",
        //   position: "bottom-right",
        // });

        // router.push({
        //   name: "Dashboard",
        //   query: { ...router?.currentRoute?.value?.query },
        // });
        router.push({
          path: '/'
        })
        return true;
      } catch (error) {
        console.log(error);
        // Notify.create({
        //   color: "warning",
        //   message: "E-mail ou senha inválidos",
        //   icon: "thumb_down",
        //   position: "bottom-right",
        // });
        return error;
      }
    },
    async logout() {
      this._auth = {};
      const router = useRouter();
      localStorage.removeItem("_auth");
      router.push({ name: "Login" });
    }
  },
});
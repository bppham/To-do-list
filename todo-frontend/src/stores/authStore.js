import { defineStore } from "pinia";
// import { loginApi, registerApi } from "../composables/api/authApi";
import { useToast } from "vue-toastification";
import { login, register } from "../services/authService";
// import { useRouter } from "vue-router";
import router from "../router/index";
const toast = useToast();
// const router = useRouter();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
  }),
  actions: {
    async login(data) {
      try {
        const res = await login(data);
        console.log("Response login: ", res.data.data);
        this.token = res.data.data.token;
        localStorage.setItem("token", this.token);
        router.push("/");
      } catch (error) {
        console.log("Error login: ", error);
        toast.error("Can not load the note by id");
      }
      // const token = await loginApi(email, password);
      // this.token = token;
      // localStorage.setItem("token", token);
    },

    async register(name, email, password, password_confirmation) {
      await register(name, email, password, password_confirmation);
    },

    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});

import { defineStore } from "pinia";
import { loginApi, registerApi } from "../composables/api/authApi";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
  }),
  actions: {
    async login(email, password) {
      const token = await loginApi(email, password);
      this.token = token;
      localStorage.setItem("token", token);
    },

    async register(name, email, password, password_confirmation) {
      await registerApi(name, email, password, password_confirmation);
    },

    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});

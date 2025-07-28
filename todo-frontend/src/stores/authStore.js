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
        toast.success("Login successfully");
        router.push("/");
      } catch (error) {
        console.log("Error login: ", error);

        // Nếu là lỗi 422 validation từ Laravel
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.errors;
          for (const field in errors) {
            errors[field].forEach((msg) => {
              toast.error(msg);
            });
          }
        }
        // Nếu là lỗi sai thông tin đăng nhập
        else if (error.response && error.response.status === 400) {
          console.log(error.response);
          toast.error(error.response.data.errors|| "Invalid credentials");
        }
        // Lỗi khác (mất kết nối, lỗi server...)
        else {
          toast.error("Something went wrong!");
        }
      }
    },

    async register(data) {
      try {
        const res = await register(data);
        console.log("Register response: ", res);
        if (res.data.success === true) {
          toast.success("Registered new account successfully");
          router.push("/auth/login");
        }
      } catch (error) {
        console.log("Register Error:", error);

        // Nếu là lỗi 422 và có error response
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.errors;
          for (const field in errors) {
            errors[field].forEach((msg) => {
              toast.error(msg);
            });
          }
        } else {
          toast.error("Something went wrong!");
        }
      }
    },

    logout() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});

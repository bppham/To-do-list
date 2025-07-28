import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { login, me, register } from "../services/authService";
import router from "../router/index";
const toast = useToast();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
    statistics: null,
  }),
  actions: {
    async login(data) {
      try {
        const res = await login(data);
        this.token = res.data.data.token;
        localStorage.setItem("token", this.token);
        toast.success("Login successfully");

        router.push("/");
      } catch (error) {
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
          toast.error(error.response.data.errors || "Invalid credentials");
        }
        // Lỗi khác (mất kết nối, lỗi server...)
        else {
          toast.error("Something went wrong!");
        }
      }
    },

    async fetchMe() {
      if (!this.token) return;

      try {
        const res = await me();
        if (res?.data?.data) {
          this.user = res.data.data.user;
          this.statistics = res.data.data.statistics;
          console.log("Fetched user:", this.user);
          console.log("Fetched stats:", this.statistics);
        }
      } catch (error) {
        toast.error("Không thể lấy thông tin người dùng");
        console.error("Lỗi fetchMe:", error);
      }
    },
    async register(data) {
      try {
        const res = await register(data);
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
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});

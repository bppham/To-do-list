import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
export function useLogin() {
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const toast = useToast();
  const authStore = useAuthStore();

  const login = async () => {
    try {
      await authStore.login(email.value, password.value);
      toast.success("Đăng nhập thành công!");
      router.push("/");
    } catch (error) {
      if (error.response && error.response.data) {
        const res = error.response.data;

        if (res.errors) {
          Object.values(res.errors).forEach((messages) => {
            messages.forEach((msg) => toast.error(msg));
          });
        } else {
          toast.error(res.message || "Đăng nhập thất bại!");
        }
      } else {
        toast.error("Lỗi kết nối đến máy chủ!");
      }
    }
  };
  return { email, password, login };
}

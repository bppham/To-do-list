import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../../stores/authStore";
export function useRegister() {
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const password_confirmation = ref("");
  const toast = useToast();
  const router = useRouter();
  const authStore = useAuthStore();

  const register = async () => {
    try {
      await authStore.register(
        name.value,
        email.value,
        password.value,
        password_confirmation.value
      );
      toast.success("Register successfully!");
      router.push("/auth/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const res = error.response.data;

        if (res.errors) {
          // Lặp từng lỗi và hiển thị từng cái bằng toast.error
          Object.values(res.errors).forEach((messages) => {
            messages.forEach((msg) => toast.error(msg));
          });
        } else {
          toast.error(res.message || "Register failed!");
        }
      } else {
        toast.error("Network error!");
      }
    }
  };
  return { name, email, password, password_confirmation, register };
}

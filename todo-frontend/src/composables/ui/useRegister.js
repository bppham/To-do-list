import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { registerApi } from "../api/authApi";
export function useRegister() {
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const password_confirmation = ref("");
  const toast = useToast();
  const router = useRouter();

  const register = async () => {
    try {
      const res = await registerApi(
        name.value,
        email.value,
        password.value,
        password_confirmation.value
      );
      await router.push("/auth/login");
    } catch (error) {
      toast.error("Info invalid");
    }
  };
  return { name, email, password, password_confirmation, register };
}

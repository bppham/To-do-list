import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { loginApi } from "../api/authApi";
export function useLogin() {
  const email = ref("");
  const password = ref("");
  const toast = useToast();
  const router = useRouter();

  const login = async () => {
    try {
      const token = await loginApi(email.value, password.value);
      localStorage.setItem("token", token);
      await router.push("/");
    } catch (error) {
      toast.error("Email or password incorrect");
    }
  };
  return { email, password, login };
}

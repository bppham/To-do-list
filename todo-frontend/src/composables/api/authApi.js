import { axiosPublic } from "../../utils/axios/axiosInstance";

export async function loginApi(email, password) {
  const res = await axiosPublic.post("/login", {
    email,
    password,
  });
  return res.data.data.token;
}

// export function useAuth() {
//   const router = useRouter();
//   const toast = useToast();
//   const email = ref("");
//   const password = ref("");
//   const user = ref(null);
//   const token = ref(localStorage.getItem("token") || null);

//   const login = async () => {
//     try {
//       const res = await axios.post("http://localhost:8000/api/login", {
//         email: email.value,
//         password: password.value,
//       });

//       token.value = res.data.data.token;
//       localStorage.setItem("token", token.value);

//       await router.push("/");
//     } catch (err) {
//       console.error("Login failed:", err.response?.data || err.message);
//       toast.error("Sai tài khoản hoặc mật khẩu");
//     }
//   };

//   const logout = () => {
//     token.value = null;
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   const isLoggedIn = () => {
//     return !!token.value;
//   };

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/user", {
//         headers: {
//           Authorization: `Bearer ${token.value}`,
//         },
//       });
//       user.value = res.data;
//     } catch (err) {
//       console.error("Fetch user failed:", err);
//     }
//   };

//   return {
//     email,
//     password,
//     token,
//     user,
//     login,
//     logout,
//     isLoggedIn,
//     fetchUser,
//   };
// }

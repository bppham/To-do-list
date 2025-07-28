import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/Login.vue";
import RegisterPage from "../views/Register.vue";
import DefaultLayout from "../layout/DefaultLayout.vue";
import HomePage from "../views/Home.vue";
import ProfilePage from "../views/Profile.vue";
import { useAuthStore } from "../stores/authStore";
const routes = [
  { path: "/auth/login", name: "Loign", component: LoginPage },
  { path: "/auth/register", name: "Register", component: RegisterPage },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomePage,
      },
      {
        path: "/profile",
        name: "Profile",
        component: ProfilePage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = !!authStore.token;

  const isAuthRoute = to.path.startsWith("/auth");

  // Nếu chưa đăng nhập và vào bất kỳ route nào không phải /auth/...
  if (!isLoggedIn && !isAuthRoute) {
    return next("/auth/login");
  }

  // Nếu đã đăng nhập mà cố vào /auth/...
  if (isLoggedIn && isAuthRoute) {
    return next("/");
  }

  next(); // Cho đi tiếp
});

export default router;

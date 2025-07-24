import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/Login.vue";
import RegisterPage from "../views/Register.vue";
import DefaultLayout from "../layout/DefaultLayout.vue";
import HomePage from "../views/Home.vue";
import ProfilePage from "../views/Profile.vue";

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

export default router;

import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/auth/Login.vue";
import RegisterPage from "../views/auth/Register.vue";
import DefaultLayout from "../layout/DefaultLayout.vue";
import HomePage from "../views/Home.vue";
import AddNotePage from "../views/AddNote.vue";

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
        path: "add-note",
        name: "AddNote",
        component: AddNotePage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

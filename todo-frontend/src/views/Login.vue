<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "../stores/authStore";

const form = reactive({
  email: "",
  password: "",
});
const authStore = useAuthStore();

const login = async () => {
  try {
    await authStore.login({ ...form });
  } catch (error) {
    console.log("Error login from login.vue: ", error);
  }
};
</script>
<template>
  <div class="mx-auto mt-20 max-w-md rounded p-6 shadow-md">
    <form
      class="mx-auto max-w-sm rounded-2xl border border-gray-300 p-10"
      @submit.prevent="login"
    >
      <h1 class="mb-7 w-full text-center text-xl font-bold">
        Login to TO DO APP
      </h1>

      <div class="mb-5">
        <label for="email" class="mb-2 block text-sm font-medium text-gray-900"
          >Your email</label
        >
        <input
          v-model="form.email"
          type="email"
          id="email"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="mb-2 block text-sm font-medium text-gray-900"
          >Your password</label
        >
        <input
          v-model="form.password"
          type="password"
          id="password"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="name@example.com"
          required
        />
      </div>
      <div class="flex justify-between mb-6">
        <div class="mb-5 flex items-start">
          <!-- <div class="flex h-5 items-center">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="h-4 w-4 rounded-sm border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Remember me</label
          > -->
        </div>
        <a
          class="ms-2 text-sm font-medium text-blue-700 italic hover:underline"
          href="/auth/register"
          >Don't have account</a
        >
      </div>

      <button
        type="submit"
        class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  </div>
</template>

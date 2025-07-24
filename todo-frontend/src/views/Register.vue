<script setup>
import { useRegister } from "../composables/ui/useRegister";
const { name, email, password, password_confirmation, register } = useRegister();
</script>

<template>
  <div class="mx-auto mt-20 max-w-md rounded p-6 shadow-md">
    <form class="mx-auto max-w-md" @submit.prevent="register">
      <h1 class="mb-7 w-full text-center text-xl font-bold">
        Register your account
      </h1>
      <div class="group relative z-0 mb-5 w-full">
        <input
          v-model="email"
          type="email"
          name="floating_email"
          id="floating_email"
          class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none"
          placeholder=" "
          required
        />
        <label
          for="floating_email"
          class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >Email address</label
        >
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="group relative z-0 mb-5 w-full">
          <input
            v-model="name"
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none"
            placeholder=" "
            required
          />
          <label
            for="floating_first_name"
            class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >Your name</label
          >
        </div>
      </div>
      <div class="group relative z-0 mb-5 w-full">
        <input
          v-model="password"
          type="password"
          name="floating_password"
          id="floating_password"
          class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none"
          placeholder=" "
          required
        />
        <label
          for="floating_password"
          class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >Password</label
        >
      </div>
      <div class="group relative z-0 mb-5 w-full">
        <input
          v-model="password_confirmation"
          type="password"
          name="repeat_password"
          id="floating_repeat_password"
          class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none"
          placeholder=" "
          required
        />
        <label
          for="floating_repeat_password"
          class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >Confirm password</label
        >
      </div>

      <button
        type="submit"
        class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Confirm
      </button>
    </form>
  </div>
</template>

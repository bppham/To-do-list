<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const closeDropdown = (e) => {
  const dropdown = e.target.closest(".relative");
  if (!dropdown) {
    showDropdown.value = false;
  }
};

// Auto close when click outside (setup global listener)
const handleClickOutside = (e) => {
  const target = e.target;
  if (!target.closest(".relative")) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const handleLogout = () => {
  authStore.logout();
  router.push("/auth/login");
};
</script>

<template>
  <header
    class="flex items-center justify-between px-6 py-3 bg-white shadow-md relative"
  >
    <!-- Logo bên trái -->
    <div class="flex items-center space-x-2">
      <a href="/">
        <span class="text-xl font-bold">MyApp</span>
      </a>
    </div>

    <!-- Avatar và Dropdown -->
    <div class="relative" @click.outside="closeDropdown">
      <img
        @click="toggleDropdown"
        src="https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
        alt="User Avatar"
        class="w-10 h-10 rounded-full border cursor-pointer"
      />
      <div
        v-if="showDropdown"
        class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10"
      >
        <ul class="py-2 text-sm text-gray-700">
          <a href="/profile">
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
          </a>
          <li
            @click="handleLogout"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

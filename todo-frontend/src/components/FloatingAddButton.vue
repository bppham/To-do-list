<script setup lang="ts">
const emit = defineEmits(["open-modal"]);

function handleClick() {
  console.log("Floating button clicked!");
  emit("open-modal");
}
</script>

<template>
  <button
    @click="handleClick"
    class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-3xl text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    +
  </button>
</template>
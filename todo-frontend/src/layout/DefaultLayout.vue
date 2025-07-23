<template>
  <div class="h-[100vh] bg-yellow-100">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
</script>

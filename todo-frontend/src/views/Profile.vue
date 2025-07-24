<script setup>
import { onMounted } from "vue";
import { useProfile } from "../composables/useProfile";

const { user, noteStats, fetchProfile } = useProfile();

onMounted(() => {
  fetchProfile();
});
console.log("User ", user.value);
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">👤 Profile</h2>

    <div v-if="loading" class="text-gray-500">Loading...</div>

    <div v-else-if="user && user.name">
      <div class="mb-6">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>

      <h3 class="text-xl font-semibold text-gray-700 mb-2">
        📊 Note Statistics
      </h3>
      <!-- <ul class="space-y-2">
        <li>✅ <strong>Total Notes:</strong> {{ noteStats.total_notes }}</li>
        <li>
          ⏳ <strong>Completed Notes:</strong>
          {{ noteStats.completed_notes }}
        </li>
        <li>
          🔧 <strong>Incompleted Notes:</strong>
          {{ noteStats.incompleted_notes }}
        </li>
        <li>
          ⌛ <strong>Expired Notes:</strong>
          {{ noteStats.expired_notes }}
        </li>
      </ul> -->
    </div>
  </div>
</template>

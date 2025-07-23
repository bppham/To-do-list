<script setup>
// No logic needed for now
import { ref, watch } from "vue";
const emit = defineEmits(["filter"]);

const searchQuery = ref("");
const selectedFilter = ref("");

watch([searchQuery, selectedFilter], () => {
  emit("filter", {
    query: searchQuery.value,
    filter: selectedFilter.value,
  });
});
</script>

<template>
  <form class="flex flex-wrap items-center gap-4 rounded-xl px-6 py-2">
    <!-- Select -->
    <div class="w-full sm:w-auto">
      <select
        v-model="selectedFilter"
        id="countries"
        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        <option value="">None</option>
        <option value="due_today">Due today</option>
        <option value="expired">Expired</option>
        <option value="end_date">Date ended</option>
        <option value="start_date">Date started</option>
        <option value="incompleted">Incompleted</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <!-- Search -->
    <div class="min-w-[200px] flex-1">
      <label class="sr-only" for="search">Search</label>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="w-full rounded-full bg-gray-50 border border-gray-300 px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  </form>
</template>

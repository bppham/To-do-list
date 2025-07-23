<template>
  <form class="flex flex-wrap items-center gap-4 rounded-xl px-6 py-2 ">
    <!-- Select -->
    <div class="w-full sm:w-auto">
      <select
        id="countries"
        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        <option value="CA">None</option>
        <option value="CA">Due today</option>
        <option value="FR">Expired</option>
        <option value="DE">Date ended</option>
        <option value="US">Date started</option>
        <option value="CA">Incompleted</option>
        <option value="FR">Completed</option>
      </select>
    </div>

    <!-- Search -->
    <div class="min-w-[200px] flex-1">
      <label class="sr-only" for="search">Search</label>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        class="w-full rounded-full bg-gray-50 border border-gray-300 px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>

    <!-- Button -->
    <div>
      <button
        type="button"
        class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script setup>
// No logic needed for now
</script>

<template>
  <div
    class="relative min-h-[100px] cursor-move rounded-lg bg-yellow-200 p-4 shadow"
  >
    <!-- Nút xoá -->
    <button
      class="absolute top-2 right-2 z-10 text-red-500 hover:text-red-700"
      @click="$emit('delete')"
    >
      ✖
    </button>

    <!-- Tiêu đề -->
    <p
      :class="{ 'line-through text-gray-500': todo?.is_done }"
      class="pr-6 font-medium break-words text-yellow-900"
      @click="$emit('view')"
    >
      {{ todo?.title }}
    </p>
    <p class="text-gray-700 text-xs italic">
      {{ todo?.end_date }}
    </p>

    <!-- Action buttons -->
    <div
      class="mt-4 flex flex-col gap-2 text-[10px] text-yellow-800 md:flex-row md:justify-between"
    >
      <button
        @click="$emit('edit')"
        class="rounded bg-blue-500 px-4 py-1 text-white transition hover:bg-blue-600"
      >
        Update
      </button>
      <button
        @click="$emit('toggle-done')"
        :class="[
          'rounded px-4 py-1 text-white transition',
          todo?.is_done
            ? 'bg-gray-500 hover:bg-gray-600'
            : 'bg-green-500 hover:bg-green-600',
        ]"
      >
        {{ todo?.is_done ? "Undo" : "Done" }}
      </button>
    </div>
  </div>
</template>

<script setup>
const { todo } = defineProps(["todo"]);
defineEmits(["delete", "toggle-done", "edit"]);
</script>

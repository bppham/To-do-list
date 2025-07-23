<script setup lang="ts">
import { onMounted, ref } from "vue";
import AddNoteModel from "../components/AddNoteModel.vue";
import Board from "../components/Board.vue";
import FloatingAddButton from "../components/FloatingAddButton.vue";
import SearchAndFilter from "../components/SearchAndFilter.vue";

const showModal = ref(false);
const noteBeingEdited = ref(null);

import { useTodo } from "../composables/useTodo";
const { todos, fetchTodos, searchAndFilterTodos } = useTodo();

onMounted(fetchTodos);

function handleSaved() {
  fetchTodos(); // Gọi lại API lấy danh sách todos mới
  showModal.value = false;
}

function openAddModal() {
  noteBeingEdited.value = null;
  showModal.value = true;
}

function openEditModal(note: any) {
  noteBeingEdited.value = note;
  showModal.value = true;
}

function handleFilter({ query, filter }) {
  searchAndFilterTodos({ query, filter }); // hoặc filter local
}
</script>

<template>
  <div class="p-4">
    <SearchAndFilter @filter="handleFilter" />
    <FloatingAddButton @open-modal="showModal = true" />
    <!-- Hiển thị danh sách todo ở đây -->
    <Board @edit-note="openEditModal" />
    <AddNoteModel
      :isOpen="showModal"
      :initialNote="noteBeingEdited"
      @close="showModal = false"
      @saved="handleSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AddNoteModel from "../components/AddNoteModel.vue";
import Board from "../components/Board.vue";
import FloatingAddButton from "../components/FloatingAddButton.vue";
import SearchAndFilter from "../components/SearchAndFilter.vue";

const showModal = ref(false);
const noteBeingEdited = ref(null);

import { useTodo } from "../composables/useTodo";
const { fetchTodos } = useTodo();

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
</script>

<template>
  <div class="p-4">
    <SearchAndFilter />
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

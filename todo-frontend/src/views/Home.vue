<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import Board from "../components/Board.vue";
import SearchAndFilter from "../components/SearchAndFilter.vue";
import FloatingAddButton from "../components/FloatingAddButton.vue";
import NoteModel from "../components/NoteModel.vue";
import { useTodoStore } from "../stores/todoStore";

const showModal = ref(false);
const noteBeingEdited = ref(null);
const viewOnly = ref(false);

const todoStore = useTodoStore();

onMounted(() => {
  todoStore.fetchTodos();
});

function handleSaved() {
  todoStore.fetchTodos();
  showModal.value = false;
}

function openAddModal() {
  noteBeingEdited.value = null;
  showModal.value = true;
  viewOnly.value = false;
}

async function openEditModal(note) {
  await todoStore.fetchTodoById(note.id);
  noteBeingEdited.value = todoStore.currentTodo;
  viewOnly.value = false;
  console.log("noteBeingEdited", noteBeingEdited);

  await nextTick(); // ⏳ Đợi noteBeingEdited.value được reactive xong
  showModal.value = true;
}

async function openViewModal(note) {
  await todoStore.fetchTodoById(note.id);
  noteBeingEdited.value = todoStore.currentTodo;
  viewOnly.value = true;

  await nextTick(); // ⏳ Đợi noteBeingEdited.value được reactive xong
  showModal.value = true;
}

function handleFilter({ query, filter }) {
  todoStore.filterTodos({ query, filter });
}
</script>

<template>
  <div class="p-4">
    <SearchAndFilter @filter="handleFilter" />
    <FloatingAddButton @open-modal="openAddModal" />
    <!-- Hiển thị danh sách todo ở đây -->
    <Board
      :todos="todoStore.todos"
      @edit-note="openEditModal"
      @view-note="openViewModal"
    />
    <NoteModel
      :key="noteBeingEdited?.id + '-' + viewOnly"
      :isOpen="showModal"
      :initialNote="noteBeingEdited"
      :viewOnly="viewOnly"
      @close="showModal = false"
      @saved="handleSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { useHome } from "../composables/ui/useHome";
import Board from "../components/Board.vue";
import FloatingAddButton from "../components/FloatingAddButton.vue";
import SearchAndFilter from "../components/SearchAndFilter.vue";
import NoteModel from "../components/NoteModel.vue";

const {
  showModal,
  noteBeingEdited,
  viewOnly,
  openAddModal,
  openEditModal,
  openViewModal,
  handleSaved,
  handleFilter,
} = useHome();
</script>

<template>
  <div class="p-4">
    <SearchAndFilter @filter="handleFilter" />
    <FloatingAddButton @open-modal="openAddModal" />
    <!-- Hiển thị danh sách todo ở đây -->
    <Board @edit-note="openEditModal" @view-note="openViewModal" />
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

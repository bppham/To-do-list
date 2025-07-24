import { ref, onMounted } from "vue";
import { useTodo } from "../api/todoApi";

export function useHome() {
  const showModal = ref(false);
  const noteBeingEdited = ref(null);
  const viewOnly = ref(false); 

  const { todos, getTodos, searchAndFilterTodos } = useTodo();

  onMounted(getTodos);

  function handleSaved() {
    getTodos();
    showModal.value = false;
  }

  function openAddModal() {
    noteBeingEdited.value = null;
    showModal.value = true;
    viewOnly.value = false;
  }

  function openEditModal(note) {
    noteBeingEdited.value = note;
    showModal.value = true;
    viewOnly.value = false;
  }

  function openViewModal(note) {
    noteBeingEdited.value = note;
    showModal.value = true;
    viewOnly.value = true;
  }

  function handleFilter({ query, filter }) {
    searchAndFilterTodos({ query, filter });
  }

  return {
    showModal,
    noteBeingEdited,
    todos,
    viewOnly,
    openAddModal,
    openEditModal,
    openViewModal,
    handleSaved,
    handleFilter,
  };
}

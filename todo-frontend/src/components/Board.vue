<script setup>
import StickyNote from "./StickyNote.vue";
import { useTodoStore } from "../stores/todoStore";
import Sortable from "sortablejs";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

const grid = ref(null);
const todoStore = useTodoStore();
const { todos } = storeToRefs(todoStore);
onMounted(() => {
  todoStore.fetchTodos();
  Sortable.create(grid.value, {
    animation: 200,
    ghostClass: "opacity-50",
  });
});

console.log("Todos in Board:", todos.value);

const removeNote = (id) => {
  todoStore.removeTodo(id);
};

const toggleDone = (todo) => {
  todoStore.toggleStatus(todo);
};
</script>

<template>
  <div ref="grid" class="grid grid-cols-3 gap-4 p-4">
    <StickyNote
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @delete="() => removeNote(todo.id)"
      @toggleDone="() => toggleDone(todo)"
      @edit="() => $emit('edit-note', todo)"
      @view="() => $emit('view-note', todo)"
    />
  </div>
</template>

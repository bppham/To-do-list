<script setup>
import StickyNote from "./StickyNote.vue";
import { useTodo } from "../composables/api/todoApi";
import Sortable from "sortablejs";
import { ref, onMounted } from "vue";

const { todos, deleteTodo, toggleDone } = useTodo();
const grid = ref(null);

onMounted(() => {
  Sortable.create(grid.value, {
    animation: 200,
    ghostClass: "opacity-50",
  });
});

const removeNote = (todo) => {
  deleteTodo(todo.id);
};
</script>

<template>
  <div ref="grid" class="grid grid-cols-3 gap-4 p-4">
    <StickyNote
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @delete="() => removeNote(todo)"
      @toggleDone="() => toggleDone(todo)"
      @edit="() => $emit('edit-note', todo)"
      @view="() => $emit('view-note', todo)"
    />
  </div>
</template>

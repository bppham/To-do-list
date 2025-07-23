// src/composables/useTodo.js
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import axiosInstance from "../utils/axiosInstance";

export function useTodo() {
  const todos = ref([]);
  const toast = useToast();

  const fetchTodos = async () => {
    try {
      const res = await axiosInstance.get("/todos");
      todos.value = res.data.data;
    } catch (err) {
      toast.error("Can not load the notes");
      console.error(err);
    }
  };

  const createTodo = async (data) => {
    try {
      const res = await axiosInstance.post("/todos", data);
      todos.value.push(res.data.data);
      toast.success("Success!");
    } catch (err) {
      toast.error("Failed to add the note");
      console.error(err);
    }
  };

  const updateTodo = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/todos/${id}`, data);
      const index = todos.value.findIndex((t) => t.id === id);
      if (index !== -1) todos.value[index] = res.data.data;
      window.location.reload();
      toast.success("Update successfully");
      
    } catch (err) {
      toast.error("Failed to update the note");
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      todos.value = todos.value.filter((t) => t.id !== id);
      toast.success("Success");
    } catch (err) {
      toast.error("Failed to delete the note");
      console.error(err);
    }
  };

  const toggleDone = async (todo) => {
    try {
      const res = await axiosInstance.patch(`/todos/${todo.id}/toggle-done`);
      const updated = res.data.data;
      const index = todos.value.findIndex((t) => t.id === todo.id);
      if (index !== -1) todos.value[index] = updated;
    } catch (error) {
      toast.error("Failed to toggle status");
      console.error(err);
    }
  };

  onMounted(fetchTodos);

  return {
    todos,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleDone,
  };
}

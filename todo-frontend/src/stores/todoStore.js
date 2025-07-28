import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  toggleTodo,
  updateTodo,
} from "../services/todoService";

const toast = useToast();

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [], // Dữ liệu đã được filter/sắp xếp
    rawTodos: [], // Dữ liệu gốc (chưa filter)
    currentTodo: null,
    lastQuery: { query: "", filter: "" },
  }),

  getters: {
    completedTodos: (state) => state.todos.filter((t) => t.is_done),
    pendingTodos: (state) => state.todos.filter((t) => !t.is_done),
  },

  actions: {
    // Lấy danh sách todos từ API và cập nhật state
    async fetchTodos() {
      try {
        const res = await getTodos();
        console.log("Response get todos: ", res);
        this.rawTodos = res.data.data;
        this.todos = [...this.rawTodos];
      } catch (err) {
        toast.error("Can not load the note by id");
        console.error(err);
      }
    },

    async fetchTodoById(id) {
      try {
        const res = await getTodoById(id);
        console.log("Response get todos: ", res);
        this.currentTodo = res.data.data;
      } catch (err) {
        toast.error("Can not load the notes");
        console.error(err);
      }
    },

    // Thêm một todo mới
    async addTodo(data) {
      try {
        const res = await createTodo(data);
        const newTodo = res.data.data;
        this.rawTodos.push(newTodo);
        this.todos.push(newTodo);
        toast.success("Todo added!");
      } catch (err) {
        toast.error("Failed to add todo");
        console.error(err);
      }
    },

    // Cập nhật todo
    async editTodo(id, data) {
      try {
        const res = await updateTodo(id, data);
        const updated = res.data.data;
        const index = this.rawTodos.findIndex((t) => t.id === id);
        if (index !== -1) this.rawTodos[index] = updated;
        this.filterTodos(this.lastQuery);
        toast.success("Updated successfully");
      } catch (err) {
        toast.error("Update failed");
        console.error(err);
      }
    },

    // Xóa todo
    async removeTodo(id) {
      try {
        await deleteTodo(id);
        this.rawTodos = this.rawTodos.filter((t) => t.id !== id);
        this.todos = this.todos.filter((t) => t.id !== id);
        toast.success("Deleted");
      } catch (err) {
        toast.error("Delete failed");
        console.error(err);
      }
    },

    // Toggle trạng thái done của todo
    async toggleStatus(todo) {
      try {
        const res = await toggleTodo(todo.id);
        const updated = res.data.data;
        const index = this.rawTodos.findIndex((t) => t.id === todo.id);
        if (index !== -1) this.rawTodos[index] = updated;
        this.filterTodos(this.lastQuery);
      } catch (err) {
        toast.error("Toggle failed");
        console.error(err);
      }
    },

    // Lọc và sắp xếp todos
    filterTodos(queryObj = {}) {
      const { query = "", filter = "" } = queryObj;
      this.lastQuery = { query, filter };
      let filtered = [...this.rawTodos];

      const today = new Date().toISOString().split("T")[0];

      if (query) {
        filtered = filtered.filter((todo) =>
          todo.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      switch (filter) {
        case "completed":
          filtered = filtered.filter((t) => t.is_done);
          break;
        case "incompleted":
          filtered = filtered.filter((t) => !t.is_done);
          break;
        case "due_today":
          filtered = filtered.filter((t) => t.end_date === today);
          break;
        case "expired":
          filtered = filtered.filter(
            (t) => t.end_date && t.end_date < today && !t.is_done
          );
          break;
        case "start_date":
          filtered.sort(
            (a, b) => new Date(b.start_date) - new Date(a.start_date)
          );
          break;
        case "end_date":
          filtered.sort((a, b) => new Date(b.end_date) - new Date(a.end_date));
          break;
      }

      this.todos = filtered;
    },
  },
});

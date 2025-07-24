import { ref } from "vue";
import { axiosAuth } from "../../utils/axios/axiosInstance";
import { useToast } from "vue-toastification";

const todos = ref([]);
const rawTodos = ref([]); // 👈 bản gốc chưa lọc
const toast = useToast();

const getTodos = async () => {
  try {
    const res = await axiosAuth.get("/todos");
    rawTodos.value = res.data.data;
    todos.value = [...rawTodos.value];
  } catch (err) {
    toast.error("Can not load the notes");
    console.error(err);
  }
};

const createTodo = async (data) => {
  try {
    const res = await axiosAuth.post("/todos", data);
    rawTodos.value.push(res.data.data);
    todos.value.push(res.data.data);
    toast.success("Success!");
  } catch (err) {
    toast.error("Failed to add the note");
    console.error(err);
  }
};

const updateTodo = async (id, data) => {
  try {
    const res = await axiosAuth.put(`/todos/${id}`, data);
    const updated = res.data.data;
    const index = rawTodos.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      rawTodos.value[index] = updated;
    }
    searchAndFilterTodos(lastQuery); // 👈 filter lại sau khi update
    toast.success("Update successfully");
  } catch (err) {
    toast.error("Failed to update the note");
    console.error(err);
  }
};

const deleteTodo = async (id) => {
  try {
    await axiosAuth.delete(`/todos/${id}`);
    rawTodos.value = rawTodos.value.filter((t) => t.id !== id);
    todos.value = todos.value.filter((t) => t.id !== id);
    toast.success("Success");
  } catch (err) {
    toast.error("Failed to delete the note");
    console.error(err);
  }
};

const toggleDone = async (todo) => {
  try {
    const res = await axiosAuth.patch(`/todos/${todo.id}/toggle-done`);
    const updated = res.data.data;
    const index = rawTodos.value.findIndex((t) => t.id === todo.id);
    if (index !== -1) rawTodos.value[index] = updated;
    searchAndFilterTodos(lastQuery);
  } catch (err) {
    toast.error("Failed to toggle status");
    console.error(err);
  }
};

// Giữ filter lần gần nhất để apply lại sau update/toggle
let lastQuery = { query: "", filter: "" };

function searchAndFilterTodos({ query = "", filter = "" }) {
  lastQuery = { query, filter }; // lưu lại
  let filtered = [...rawTodos.value];

  if (query) {
    filtered = filtered.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (filter === "completed") {
    filtered = filtered.filter((todo) => todo.is_done);
  } else if (filter === "incompleted") {
    filtered = filtered.filter((todo) => !todo.is_done);
  } else if (filter === "due_today") {
    const today = new Date().toISOString().split("T")[0];
    filtered = filtered.filter((todo) => todo.end_date === today);
  } else if (filter === "expired") {
    const today = new Date().toISOString().split("T")[0];
    filtered = filtered.filter(
      (todo) => todo.end_date && todo.end_date < today && !todo.is_done
    );
  } else if (filter === "start_date") {
    filtered.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
  } else if (filter === "end_date") {
    filtered.sort((a, b) => new Date(b.end_date) - new Date(a.end_date));
  }

  todos.value = filtered;
}

export function useTodo() {
  return {
    todos,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleDone,
    searchAndFilterTodos,
  };
}

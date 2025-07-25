import { axiosAuth } from "../utils/axios/axiosInstance";

export const getTodos = async () => {
  const response = await axiosAuth.get("/todos");
  return response;
};

export const getTodoById = async (id) => {
  const response = await axiosAuth.get(`/todos/${id}`);
  return response;
};

export const createTodo = async (data) => {
  const response = await axiosAuth.post("/todos", data);
  return response;
};

export const updateTodo = async (id, data) => {
  const response = await axiosAuth.put(`/todos/${id}`, data);
  return response;
};

export const deleteTodo = async (id) => {
  const response = await axiosAuth.delete(`/todos/${id}`);
  return response;
};

export const toggleTodo = async (id) => {
  const response = await axiosAuth.patch(`/todos/${id}/toggle-done`);
  return response;
};

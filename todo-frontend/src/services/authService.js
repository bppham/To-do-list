import { axiosAuth, axiosPublic } from "../utils/axios/axiosInstance";

export const login = async (data) => {
  const response = await axiosPublic.post("/login", data);
  return response;
};

export const register = async (data) => {
  const response = await axiosPublic.post("/register", data);
  return response;
};

export const me = async () => {
  const response = await axiosAuth.get("/profile");
  return response;
};

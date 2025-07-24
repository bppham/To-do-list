import { axiosPublic } from "../../utils/axios/axiosInstance";

const loginApi = async (email, password) => {
  const res = await axiosPublic.post("/login", {
    email,
    password,
  });
  return res.data.data.token;
};

const registerApi = async (name, email, password, password_confirmation) => {
  const res = await axiosPublic.post("/register", {
    name,
    email,
    password,
    password_confirmation,
  });
  return res.data.data;
};

export { loginApi, registerApi };

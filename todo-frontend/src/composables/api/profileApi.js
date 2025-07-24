import { axiosAuth } from "../../utils/axios/axiosInstance";

export async function getProfile() {
  const res = await axiosAuth.get("/profile");
  return res.data.data;
}

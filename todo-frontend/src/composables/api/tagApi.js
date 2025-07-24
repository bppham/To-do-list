import {axiosPublic} from "../../utils/axios/axiosInstance";

export async function getTags() {
  const response = await axiosPublic.get("/tags");
  return response.data.data || [];
}

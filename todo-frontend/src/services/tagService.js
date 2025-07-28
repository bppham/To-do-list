import { axiosPublic } from "../utils/axios/axiosInstance";

export const getAllTags = async () => {
  const response = await axiosPublic.get(`/tags`);
  return response;
};

import { axiosPublic } from "../../utils/axios/axiosInstance";

const getTags = async () => {
  const response = await axiosPublic.get("/tags");
  return response.data.data || [];
};

export { getTags };

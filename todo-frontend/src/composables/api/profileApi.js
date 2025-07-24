import { axiosAuth } from "../../utils/axios/axiosInstance";

const getProfile = async () => {
  const res = await axiosAuth.get("/profile");
  return res.data.data;
};

export { getProfile };

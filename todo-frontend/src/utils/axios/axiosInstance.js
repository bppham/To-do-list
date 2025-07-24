import { createAxiosInstance } from "./axiosFactory";

export const axiosPublic = createAxiosInstance(false);
export const axiosAuth = createAxiosInstance(true);
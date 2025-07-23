import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const API_URL = "http://localhost:8000/api";
// const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
});

export function useTag() {
  const tags = ref([]);
  const toast = useToast();

  const fetchTags = async () => {
    try {
      const response = await axiosInstance.get("/tags");
      tags.value = response.data.data || [];
    } catch (error) {
      console.error("Failed to load tags", error);
      toast.error("Failed to load tags");
    }
  };

  onMounted(() => {
    fetchTags();
  });

  return {
    tags,
    fetchTags,
  };
}

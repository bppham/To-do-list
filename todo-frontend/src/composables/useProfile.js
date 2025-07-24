import { ref } from "vue";
import axiosInstance from "../utils/axiosInstance";
import { useToast } from "vue-toastification";

const user = ref(null);
const noteStats = ref({
  total: 0,
  completed: 0,
  incompleted: 0,
  expired: 0,
});

const toast = useToast();

const fetchProfile = async () => {
  try {
    const res = await axiosInstance.get("/profile");
    user.value = res.data.data.user;
    noteStats.value = res.data.data.stats;
  } catch (err) {
    toast.error("Failed to load profile info");
    console.error(err);
  }
};

export function useProfile() {
  return {
    user,
    noteStats,
    fetchProfile,
  };
}

import { ref } from "vue";
import { useToast } from "vue-toastification";
import { getProfile } from "../api/profileApi";

export function useProfile() {
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
      const data = await getProfile();
      user.value = data.user;
      noteStats.value = data.statistics;
    } catch (err) {
      toast.error("Failed to load profile info");
      console.error(err);
    }
  };

  return {
    user,
    noteStats,
    fetchProfile,
  };
}

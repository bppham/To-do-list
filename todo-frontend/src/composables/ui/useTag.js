// logic/ui/useTag.js
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { getTags } from "../api/tagApi";

export function useTag() {
  const tags = ref([]);
  const toast = useToast();

  const fetchTags = async () => {
    try {
      tags.value = await getTags();
    } catch (error) {
      console.error("Failed to load tags", error);
      toast.error("Failed to load tags");
    }
  };

  onMounted(fetchTags);

  return {
    tags,
    fetchTags,
  };
}
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { getAllTags } from "../services/tagService";

const toast = useToast();

export const useTagStore = defineStore("tag", {
  state: () => {
    tags: [];
  },
  actions: {
    async fetchTags() {
      try {
        const res = await getAllTags();
        this.tags = res.data.data;
      } catch (error) {
        toast.error("Tags cannot be loaded");
        console.log(error);
      }
    },
  },
});

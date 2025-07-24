import { reactive, ref, watch, onMounted } from "vue";
import { useTodo } from "../api/todoApi";
import { useTag } from "./useTag";

export function useNoteModel(intialNote) {
  const { createTodo, updateTodo } = useTodo();
  const { tags, fetchTags } = useTag();

  const form = reactive({
    title: "",
    description: "",
    repeat: "",
    startDate: "",
    endDate: "",
  });

  const selectedTagIds = ref([]);

  watch(
    intialNote,
    (note) => {
      if (note) {
        form.title = note.title;
        form.description = note.description;
        form.repeat = note.repeat;
        form.startDate = note.start_date;
        form.endDate = note.end_date;
        selectedTagIds.value = note.tags?.map((tag) => tag.id) || [];
      } else {
        resetForm();
      }
    },
    { immediate: true }
  );

  function resetForm() {
    form.title = "";
    form.description = "";
    form.repeat = "none";
    form.startDate = "";
    form.endDate = "";
    selectedTagIds.value = [];
  }

  function isSelected(tagId) {
    return selectedTagIds.value.includes(tagId);
  }

  function toggleTag(tagId) {
    if (selectedTagIds.value.includes(tagId)) {
      selectedTagIds.value = selectedTagIds.value.filter((id) => id !== tagId);
    } else {
      selectedTagIds.value.push(tagId);
    }
  }

  async function submitNote(id = null) {
    const payload = {
      title: form.title,
      description: form.description,
      repeat: form.repeat,
      start_date: form.startDate,
      end_date: form.endDate,
      tag_ids: selectedTagIds.value,
    };

    if (id) {
      return await updateTodo(id, payload);
    } else {
      return await createTodo(id, payload);
    }
  }

  return {
    form,
    tags,
    selectedTagIds,
    isSelected,
    fetchTags,
    toggleTag,
    submitNote,
    resetForm,
  };
}

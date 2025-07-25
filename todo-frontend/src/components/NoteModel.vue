<script setup>
import { reactive, ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";
import { useTag } from "../composables/ui/useTag";
import { useTodoStore } from "../stores/todoStore";

const props = defineProps({
  isOpen: Boolean,
  initialNote: Object,
  viewOnly: Boolean,
});
const emit = defineEmits(["close", "saved"]);

const todoStore = useTodoStore();
const { tags, fetchTags } = useTag();

const selectedTagIds = ref([]);

const form = reactive({
  title: "",
  description: "",
  repeat: "none",
  startDate: "",
  endDate: "",
});

const resetForm = () => {
  form.title = "";
  form.description = "";
  form.repeat = "none";
  form.startDate = "";
  form.endDate = "";
  selectedTagIds.value = [];
};

const syncFormFromNote = (note) => {
  if (!note) return;
  form.title = note.title || "";
  form.description = note.description || "";
  form.repeat = note.repeat || "none";
  form.startDate = note.start_date || "";
  form.endDate = note.end_date || "";
  const tagIds = note.tags?.map(tag => tag.id) || [];
  selectedTagIds.value.splice(0, selectedTagIds.value.length, ...tagIds);
};

// Khi mở modal => fetch tag + đồng bộ dữ liệu
watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      fetchTags();
      syncFormFromNote(props.initialNote);
    } else {
      resetForm();
    }
  }
);

// Đồng bộ lại nếu initialNote thay đổi trong khi modal đang mở
watch(
  () => props.initialNote,
  (note) => {
    console.log(">>> [NoteModel] props.initialNote thay đổi:", note);
    if (props.isOpen && note) {
      syncFormFromNote(note);
    }
  }
);

const toggleTag = (id) => {
  const index = selectedTagIds.value.indexOf(id);
  if (index === -1) {
    selectedTagIds.value.push(id);
  } else {
    selectedTagIds.value.splice(index, 1);
  }
};

const isSelected = (id) => selectedTagIds.value.includes(id);

const closeModal = () => emit("close");

async function submitForm() {
  const payload = {
    title: form.title,
    description: form.description,
    repeat: form.repeat,
    start_date: form.startDate,
    end_date: form.endDate,
    tag_ids: selectedTagIds.value,
  };

  try {
    if (props.initialNote?.id) {
      await todoStore.editTodo(props.initialNote.id, payload);
    } else {
      await todoStore.addTodo(payload);
    }
    emit("saved");
    closeModal();
  } catch (error) {
    console.error("Lỗi khi tạo/cập nhật note:", error);
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
  >
    <div
      class="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
    >
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-800">
          Don't wanna forget something?
        </h2>
        <button
          @click="closeModal"
          class="text-gray-500 hover:text-red-500 text-2xl font-bold leading-none"
        >
          &times;
        </button>
      </div>

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="form.title"
              type="text"
              name="title"
              class="w-full rounded border px-3 py-2"
              :disabled="viewOnly"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Repeat</label
            >
            <select
              v-model="form.repeat"
              class="w-full rounded border px-3 py-2"
              :disabled="viewOnly"
            >
              <option value="none">None</option>
              <option value="everyday">Everyday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              v-model="form.description"
              name="description"
              rows="4"
              class="w-full rounded border px-3 py-2"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Start date</label
            >
            <input
              v-model="form.startDate"
              type="date"
              class="w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Due date</label
            >
            <input
              v-model="form.endDate"
              type="date"
              class="w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        <div class="my-4">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Tags</label
          >
          <div class="flex flex-wrap gap-2">
            <div
              v-for="tag in tags"
              :key="tag.id"
              class="cursor-pointer rounded-full px-4 py-1 text-sm transition border"
              :class="isSelected(tag.id) ? 'text-white' : 'bg-white'"
              :style="
                isSelected(tag.id)
                  ? { backgroundColor: tag.color, borderColor: tag.color }
                  : { color: tag.color, borderColor: tag.color }
              "
              @click="!viewOnly && toggleTag(tag.id)"
            >
              {{ tag.name }}
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end" v-if="!viewOnly">
          <button
            type="submit"
            class="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            {{ props.initialNote?.id ? "Save" : "Add" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

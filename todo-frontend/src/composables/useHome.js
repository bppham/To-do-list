import { ref, onMounted } from "vue";

export function useHome() {
    const showModel = ref(false);
    const noteBeingEdited = ref(null);
}

import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const shouldDisplayModal = ref(false);

export function useDisplayAlertModal() {
  const setDisplayAlertModal = (force) => {
    shouldDisplayModal.value = force;
  };

  return { shouldDisplayModal, setDisplayAlertModal };
}

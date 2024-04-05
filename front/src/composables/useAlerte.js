import { getOneByAlerte, getPieceByAlerte } from "@/services/api.service";
import { ref } from "vue";
const test = ref(false);
export function useAlerte() {
  const getOneAlerte = async (id) => {
    const response = await getOneByAlerte(id);
    return response.data;
  };

  const getPieceAlerte = async (id) => {
    const response = await getPieceByAlerte(id);
    return response.data;
  }
  const changeTest = () => {
    test.value = !test.value;
  }
  const getTest = () => {
    return test.value;
  }
  return { getOneAlerte, getPieceAlerte, changeTest, getTest };
}

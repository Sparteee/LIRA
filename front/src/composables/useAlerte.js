import { getOneByAlerte } from "@/services/api.service";

export function useAlerte() {
  const getOneAlerte = async (id) => {
    const response = await getOneByAlerte(id);
    return response.data;
  };
  return { getOneAlerte };
}

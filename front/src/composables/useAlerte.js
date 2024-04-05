import { getOneByAlerte, getPieceByAlerte } from "@/services/api.service";

export function useAlerte() {
  const getOneAlerte = async (id) => {
    const response = await getOneByAlerte(id);
    return response.data;
  };

  const getPieceAlerte = async (id) => {
    const response = await getPieceByAlerte(id);
    return response.data;
  }
  return { getOneAlerte, getPieceAlerte };
}

import * as api from '@/services/api.service';

export function usePiece() {
  const getPieces = async () => {
    try {
      const response = await api.getPieces();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getIndicateursByPiece = async (id) => {
    try {
      const response = await api.getIndicateursByPiece(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { getPieces, getIndicateursByPiece };
}
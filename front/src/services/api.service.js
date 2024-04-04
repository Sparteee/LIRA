import instance from "@/config/axios";

export async function getPieces() {
  const { data } = await instance.get("/pieces");
  return data;
}

export async function getIndicateursByPiece(id) {
  const { data } = await instance.get(`/pieces/${id}?populate=indicateurs`);
  return data;
}
import instance from "@/config/axios";

export function getPieces() {
  return instance.get("/pieces");
}

export async function getIndicateurs() {
  const { data } = await instance.get("/indicateurs?populate=alertes");
  return data;
}

export async function getAlertes() {
  const { alerte } = await instance.get("/alertes");
  return alerte;
}

export function postAlerte(data) {
  return instance.post("/alertes", { data: data });
}

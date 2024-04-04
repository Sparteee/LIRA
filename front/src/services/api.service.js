import instance from "@/config/axios";

export function getPieces() {
  return instance.get("/pieces");
}

export async function getIndicateurs() {
  const { data } = await instance.get("/indicateurs?populate=alertes");
  return data;
}

export async function getAlertes() {
  const { data } = await instance.get(
    "/alertes?sort=id:desc&pagination[limit]=1"
  );
  return data;
}

export function postAlerte(data) {
  return instance.post("/alertes", { data: data });
}

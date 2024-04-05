import instance from "@/config/axios";

export async function getPieces() {
  const { data } = await instance.get("/pieces");
  return data;
}

export async function getIndicateursByPiece(id) {
  const { data } = await instance.get(`/pieces/${id}?populate=indicateurs`);
  return data;
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
export async function getOneByAlerte(id) {
  const { data } = await instance.get(`/alertes/${id}?populate=indicateur`);
  return data;
}

export function postAlerte(data) {
  return instance.post("/alertes", { data: data });
}


export function putAlerte(id, data) {
  return instance.put(`/alertes/${id}`, { data: data });
}

export function putIndicateur(id, data) {
  return instance.put(`/indicateurs/${id}`, { data: data });
}

export function apiLogin(form) {
  return instance.post('/auth/local', form)
}

export function isAuthenticated() {
  return !!localStorage.getItem('AUTH_TOKEN')
}
export function logoutApi() {
  localStorage.clear()
}

export async function getMe() {
  const data = await instance.get('/users/me')
  return data;
}

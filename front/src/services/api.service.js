import instance from "@/config/axios";

export function getPieces() {
  return instance.get("/pieces");
}

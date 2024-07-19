import timbradoApi from "@/api/timbrado-api";
import type { Bitacora } from "../interfaces/bitacora";

export const getBitacora = async (id: number): Promise<Bitacora[]> => {
  const { data } = await timbradoApi.get<Bitacora[]>(`/cliente/bitacora/${id}`);

  return data;
};

import timbradoApi from "@/api/timbrado-api";
import type { ResponseData } from "@/interfaces/response-data";

export const deleteRol = async (id: number): Promise<ResponseData> => {
  const { data } = await timbradoApi.delete<ResponseData>(`/roles/${id}`);

  return data;
};

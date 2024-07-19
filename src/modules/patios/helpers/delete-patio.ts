import timbradoApi from "@/api/timbrado-api";
import type { ResponseData } from "@/interfaces/response-data";

export const deletePatio = async (id: number): Promise<ResponseData> => {
  const { data } = await timbradoApi.delete<ResponseData>(`/patios/${id}`);

  return data;
};

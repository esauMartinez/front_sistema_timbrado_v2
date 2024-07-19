import timbradoApi from "@/api/timbrado-api";
import type { ResponseData } from "@/interfaces/response-data";

export const deleteOperador = async (id: number): Promise<ResponseData> => {
  const { data } = await timbradoApi.delete<ResponseData>(`/operadores/${id}`);

  return data;
};

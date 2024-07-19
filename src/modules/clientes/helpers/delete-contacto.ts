import timbradoApi from "@/api/timbrado-api";
import type { ResponseData } from "@/interfaces/response-data";

export const deleteContacto = async (id: number): Promise<ResponseData> => {
  const { data } = await timbradoApi.delete<ResponseData>(
    `/cliente/contactos/${id}`
  );

  return data;
};

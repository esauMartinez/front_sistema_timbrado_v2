import type { Contacto } from "../interfaces/contacto";
import type { ResponseData } from "@/interfaces/response-data";
import timbradoApi from "@/api/timbrado-api";

export const postContacto = async (
  contacto: Contacto
): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(
    `/cliente/contacto`,
    contacto
  );

  return data;
};

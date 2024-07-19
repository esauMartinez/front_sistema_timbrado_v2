import timbradoApi from "@/api/timbrado-api";
import type { Contacto } from "../interfaces/contacto";

export const getContactos = async (id: number): Promise<Contacto[]> => {
  const { data } = await timbradoApi.get<Contacto[]>(
    `/cliente/contactos/${id}`
  );

  return data;
};

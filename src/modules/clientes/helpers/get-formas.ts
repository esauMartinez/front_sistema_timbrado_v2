import timbradoApi from "@/api/timbrado-api";
import type { FormaPago } from "../interfaces/datosFiscales/formaPago";

export const getForma = async (): Promise<FormaPago[]> => {
  const { data } = await timbradoApi.get<FormaPago[]>("/formas-pago");

  return data;
};

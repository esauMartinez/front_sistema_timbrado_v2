import timbradoApi from "@/api/timbrado-api";
import type { MetodoPago } from "../interfaces/datosFiscales/metodoPago";

export const getMetodo = async (): Promise<MetodoPago[]> => {
  const { data } = await timbradoApi.get<MetodoPago[]>("/metodos-pago");

  return data;
};

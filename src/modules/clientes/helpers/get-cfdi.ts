import timbradoApi from "@/api/timbrado-api";
import type { UsoCfdi } from "../interfaces/datosFiscales/usoCfdi";

export const getCdfi = async (): Promise<UsoCfdi[]> => {
  const { data } = await timbradoApi.get<UsoCfdi[]>("/uso-cfdi");

  return data;
};

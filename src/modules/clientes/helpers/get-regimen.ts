import timbradoApi from "@/api/timbrado-api";
import type { RegimenFiscal } from "../interfaces/datosFiscales/regimenFiscal";

export const getRegimen = async (): Promise<RegimenFiscal[]> => {
  const { data } = await timbradoApi.get<RegimenFiscal[]>("/regimen-fiscal");

  return data;
};

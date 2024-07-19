import timbradoApi from "@/api/timbrado-api";
import type { Operador } from "@/modules/operadores/interfaces/operador";
import type { ResponseData } from "@/interfaces/response-data";

export const updateOperador = async (
  operador: Operador
): Promise<ResponseData> => {
  const { data } = await timbradoApi.put<ResponseData>(
    `/operadores/${operador.id}`,
    operador
  );

  return data;
};

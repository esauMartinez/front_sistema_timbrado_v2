import type { Cliente } from "../interfaces/cliente";
import type { ResponseData } from "@/interfaces/response-data";
import timbradoApi from "@/api/timbrado-api";

export const postCliente = async (cliente: Cliente): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(`/clientes`, cliente);

  return data;
};

import type { Cliente } from "../interfaces/cliente";
import type { ResponseData } from "@/interfaces/response-data";
import timbradoApi from "@/api/timbrado-api";

export const putCliente = async (cliente: Cliente): Promise<ResponseData> => {
  const { data } = await timbradoApi.put<ResponseData>(
    `/clientes/${cliente.id}`,
    cliente
  );

  return data;
};

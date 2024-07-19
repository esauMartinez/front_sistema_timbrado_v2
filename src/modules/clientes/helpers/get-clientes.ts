import timbradoApi from "@/api/timbrado-api";
import type { Cliente } from "../interfaces/cliente";

export const getClientes = async (): Promise<Cliente[]> => {
  const { data } = await timbradoApi.get<Cliente[]>("/clientes");

  return data;
};

import timbradoApi from "@/api/timbrado-api";
import type { Cliente } from "../interfaces/cliente";

export const getCliente = async (id: number): Promise<Cliente> => {
  const { data } = await timbradoApi.get<Cliente>(`/clientes/${id}`);

  return data;
};

import timbradoApi from "@/api/timbrado-api";
import type { Operador } from "@/modules/operadores/interfaces/operador";
import moment from "moment";

export const getOperador = async (id: number): Promise<Operador> => {
  const { data } = await timbradoApi.get<Operador>(`/operadores/${id}`);

  data.fecha_nacimiento = moment(data.fecha_nacimiento).format("DD/MM/YYYY");
  data.fecha_ingreso = moment(data.fecha_ingreso).format("DD/MM/YYYY");
  data.vencimiento_licencia = moment(data.vencimiento_licencia).format(
    "DD/MM/YYYY"
  );

  return data;
};

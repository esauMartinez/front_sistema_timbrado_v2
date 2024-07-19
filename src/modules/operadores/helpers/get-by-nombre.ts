import timbradoApi from '@/api/timbrado-api'
import type { Operador } from '@/modules/operadores/interfaces/operador'

export const getOperadoresPorNombre = async (nombre: string): Promise<Operador[]> => {
  const { data } = await timbradoApi.get<Operador[]>(`/operadores-por-nombre/${nombre}`)
  return data
}

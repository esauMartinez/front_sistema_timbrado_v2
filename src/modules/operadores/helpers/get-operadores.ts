import timbradoApi from '@/api/timbrado-api'
import type { Operador } from '@/modules/operadores/interfaces/operador'

export const getOperadores = async (): Promise<Operador[]> => {
  const { data } = await timbradoApi.get<Operador[]>('/operadores')

  return data
}

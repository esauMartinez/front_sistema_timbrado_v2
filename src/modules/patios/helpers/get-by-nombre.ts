import timbradoApi from '@/api/timbrado-api'
import type { Patio } from '@/modules/patios/interfaces/patio'

export const getPatiosPorNombre = async (nombre: string): Promise<Patio[]> => {
  if (nombre !== undefined && nombre !== '') {
    const { data } = await timbradoApi.get<Patio[]>(`/patios-por-nombre/${nombre}`)
    return data
  }
  return []
}

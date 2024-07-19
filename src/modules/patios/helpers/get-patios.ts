import timbradoApi from '@/api/timbrado-api'
import type { Patio } from '@/modules/patios/interfaces/patio'

export const getPatios = async (): Promise<Patio[]> => {
  const { data } = await timbradoApi.get<Patio[]>('/patios')

  return data
}

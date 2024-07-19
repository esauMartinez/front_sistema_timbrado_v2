import timbradoApi from '@/api/timbrado-api'
import type { Patio } from '@/modules/patios/interfaces/patio'

export const getPatio = async (id: number): Promise<Patio> => {
  const { data } = await timbradoApi.get<Patio>(`/patios/${id}`)

  return data
}

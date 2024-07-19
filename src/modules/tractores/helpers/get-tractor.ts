import timbradoApi from '@/api/timbrado-api'
import type { Tractor } from '@/modules/tractores/interfaces/tractor'

export const getTractor = async (id: number): Promise<Tractor> => {
  const { data } = await timbradoApi.get<Tractor>(`/tractores/${id}`)

  return data
}

import timbradoApi from '@/api/timbrado-api'
import type { Tractor } from '@/modules/tractores/interfaces/tractor'

export const getTractores = async (): Promise<Tractor[]> => {
  const { data } = await timbradoApi.get<Tractor[]>(`/tractores`)

  return data
}

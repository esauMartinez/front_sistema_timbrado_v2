import timbradoApi from '@/api/timbrado-api'
import type { Bitacora } from '@/modules/trips/interfaces/bitacora'

export const getBitacora = async (id: number): Promise<Bitacora[]> => {
  const { data } = await timbradoApi.get<Bitacora[]>(`/trip/bitacora/${id}`)

  return data
}

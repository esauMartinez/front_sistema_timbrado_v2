import timbradoApi from '@/api/timbrado-api'
import type { Timbre } from '@/modules/trips/interfaces/timbre'

export const getTimbres = async (trip: number): Promise<Timbre[]> => {
  const { data } = await timbradoApi.get<Timbre[]>(`/acuses/${trip}`)

  return data
}

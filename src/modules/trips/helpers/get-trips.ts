import timbradoApi from '@/api/timbrado-api'
import type { Trip } from '@/modules/trips/interfaces/trips'

export const getTrips = async (estatus: string, from: string, to: string): Promise<Trip[]> => {
  const { data } = await timbradoApi.get<Trip[]>(`/trips/${estatus}/${from}/${to}`)

  return data
}

import timbradoApi from '@/api/timbrado-api'
import type { Trip } from '@/modules/trips/interfaces/trips'

export const getTrip = async (id: number): Promise<Trip> => {
  const { data } = await timbradoApi.get<Trip>(`/trips/${id}`)

  return data
}

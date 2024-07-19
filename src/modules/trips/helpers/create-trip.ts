import timbradoApi from '@/api/timbrado-api'
import type { Trip } from '@/modules/trips/interfaces/trips'

export const createTrip = async (trip: Trip) => {
  const { data } = await timbradoApi.post(`/trips`, trip)

  return data
}

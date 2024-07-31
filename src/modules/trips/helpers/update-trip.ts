import timbradoApi from '@/api/timbrado-api'
import type { Trip } from '@/modules/trips/interfaces/trip'

export const updateTrip = async (trip: Trip) => {
  const { data } = await timbradoApi.put(`/trips/${trip.id}`, trip)

  return data
}

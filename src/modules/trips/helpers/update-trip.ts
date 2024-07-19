import timbradoApi from '@/api/timbrado-api'
import type { Movimiento } from '@/interfaces/movimiento.model'
import type { Trip } from '@/modules/trips/interfaces/trips'

export const updateTrip = async (trip: Trip, movimientos: Movimiento[]) => {
  const { data } = await timbradoApi.put(`/trips/${trip.id}`, { ...trip, movimientos })

  return data
}

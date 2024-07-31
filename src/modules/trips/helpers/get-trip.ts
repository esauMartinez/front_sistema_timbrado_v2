import timbradoApi from '@/api/timbrado-api'
import type { Trip } from '@/modules/trips/interfaces/trip'

export const getTrip = async (id: number): Promise<Trip> => {
  const { data } = await timbradoApi.get<Trip>(`/trips/${id}`)
  data.kilometros = +data.kilometros
  data.combustible = +data.combustible
  data.viaticos = +data.viaticos
  data.casetas = +data.casetas
  return data
}

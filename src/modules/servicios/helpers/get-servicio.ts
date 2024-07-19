import timbradoApi from '@/api/timbrado-api'
import type { Servicio } from '../interfaces/servicio'

export const getServicio = async (id: number): Promise<Servicio> => {
  const { data } = await timbradoApi.get<Servicio>(`/servicios/${id}`)

  return data
}

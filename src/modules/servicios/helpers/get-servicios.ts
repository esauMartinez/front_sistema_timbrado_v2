import timbradoApi from '@/api/timbrado-api'
import type { Servicio } from '../interfaces/servicio'

export const getServicios = async (): Promise<Servicio[]> => {
  const { data } = await timbradoApi.get<Servicio[]>('/servicios')

  return data
}

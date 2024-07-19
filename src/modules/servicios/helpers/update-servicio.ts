import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Servicio } from '../interfaces/servicio'

export const updateServicio = async (servicio: Servicio): Promise<ResponseData> => {
  const { data } = await timbradoApi.put(`/servicios/${servicio.id}`, servicio)

  return data
}

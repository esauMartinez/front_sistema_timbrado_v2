import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Servicio } from '../interfaces/servicio'

export const postServicio = async (servicio: Servicio): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(`/servicios`, servicio)
  return data
}

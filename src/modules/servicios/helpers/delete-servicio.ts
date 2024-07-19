import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'

export const deleteServicio = async (id: number): Promise<ResponseData> => {
  const { data } = await timbradoApi.delete(`/servicios/${id}`)

  return data
}

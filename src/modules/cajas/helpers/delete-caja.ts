import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'

export const deleteCaja = async (id: number): Promise<ResponseData> => {
  const { data } = await timbradoApi.delete(`/cajas/${id}`)

  return data
}

import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Patio } from '@/modules/patios/interfaces/patio'

export const postPatio = async (patio: Patio): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(`/patios`, patio)

  return data
}

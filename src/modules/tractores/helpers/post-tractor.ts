import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Tractor } from '@/interfaces/tractor.model'

export const postTractor = async (payload: Tractor): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(`/tractores`, payload)

  return data
}

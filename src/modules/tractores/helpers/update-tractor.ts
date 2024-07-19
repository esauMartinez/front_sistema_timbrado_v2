import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Tractor } from '@/interfaces/tractor.model'

export const updateTractor = async (payload: Tractor): Promise<ResponseData> => {
  const { data } = await timbradoApi.put<ResponseData>(`/tractores/${payload.id}`, payload)

  return data
}

import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Patio } from '@/modules/patios/interfaces/patio'

export const updatePatio = async (patio: Patio): Promise<ResponseData> => {
  const { data } = await timbradoApi.put<ResponseData>(`/patios/${patio.id}`, patio)

  return data
}

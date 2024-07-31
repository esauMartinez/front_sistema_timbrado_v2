import timbradoApi from '@/api/timbrado-api'
import type { Mercancia } from '@/interfaces/mercancia.model'
import type { ResponseData } from '@/interfaces/response-data'

export const postMercancia = async (mercancia: Mercancia): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(`/guardar-mercancia-trip`, mercancia)
  return data
}

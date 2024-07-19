import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Caja } from '@/modules/cajas/interfaces/caja'

export const postCaja = async (payload: Caja): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(`/cajas`, payload)

  return data
}

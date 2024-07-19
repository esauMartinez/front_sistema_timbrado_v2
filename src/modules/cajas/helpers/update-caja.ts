import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Caja } from '@/modules/cajas/interfaces/caja'

export const updateCaja = async (payload: Caja): Promise<ResponseData> => {
  const { data } = await timbradoApi.put<ResponseData>(`/cajas/${payload.id}`, payload)

  return data
}

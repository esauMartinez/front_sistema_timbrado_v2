import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'

export const deleteConcepto = async (id: number): Promise<ResponseData> => {
  const { data } = await timbradoApi.delete<ResponseData>(`/eliminar-concepto-trip/${id}`)

  return data
}

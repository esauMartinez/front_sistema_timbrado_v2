import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'

export const deleteMarca = async (id: number): Promise<ResponseData> => {
  const { data } = await timbradoApi.delete<ResponseData>(`/marcas/${id}`)

  return data
}

import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'

export const deleteMercancia = async (id: number): Promise<ResponseData> => {
  const { data } = await timbradoApi.delete<ResponseData>(`/eliminar-mercancia-trip/${id}`)

  return data
}

import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'

export const deleteRegimenAduanero = async (id: number): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(`/eliminar-regimen-aduanero/${id}`)
  return data
}

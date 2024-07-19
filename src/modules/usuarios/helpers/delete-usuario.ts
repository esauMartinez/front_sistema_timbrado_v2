import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'

export const deleteUsuario = async (id: number): Promise<ResponseData> => {
  const { data } = await timbradoApi.delete<ResponseData>(`/usuarios/${id}`)
  return data
}

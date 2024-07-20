import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'

export const updateOperador = async (formData: FormData): Promise<ResponseData> => {
  const { data } = await timbradoApi.put<ResponseData>(`/operadores`, formData)

  return data
}

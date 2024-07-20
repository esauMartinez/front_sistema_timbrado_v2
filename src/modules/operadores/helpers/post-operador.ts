import timbradoApi from '@/api/timbrado-api'

import type { ResponseData } from '@/interfaces/response-data'
import type { Operador } from '@/modules/operadores/interfaces/operador'

export const postOperador = async (formData: FormData): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(`/operadores`, formData)

  return data
}

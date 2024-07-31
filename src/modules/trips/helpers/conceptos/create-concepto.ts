import timbradoApi from '@/api/timbrado-api'
import type { Concepto } from '@/interfaces/concepto.model'
import type { ResponseData } from '@/interfaces/response-data'

export const postConcepto = async (concepto: Concepto): Promise<ResponseData> => {
  const { data } = await timbradoApi.post(`/guardar-concepto-trip`, concepto)
  return data
}

import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { RegimenAduanero } from '@/modules/trips/interfaces/regimenAduanero'

export const createRegimenAduanero = async (regimen: RegimenAduanero): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>('/crear-regimen-aduanero', regimen)
  return data
}

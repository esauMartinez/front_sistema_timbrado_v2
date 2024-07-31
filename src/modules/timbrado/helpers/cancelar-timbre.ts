import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Cancelacion } from '@/modules/timbrado/interfaces/cancelacion-sat'

export const cancelarTimbre = async (cancelacion: Cancelacion): Promise<ResponseData> => {
  const { data } = await timbradoApi.put<ResponseData>(
    `/cancelar-timbre/${cancelacion.id}`,
    cancelacion
  )

  return data
}

import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Comentario } from '@/modules/trips/interfaces/comentario'

export const createComentario = async (comentario: Comentario): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(`/agregar-comentario`, comentario)
  return data
}

import timbradoApi from '@/api/timbrado-api'
import type { Comentario } from '@/modules/trips/interfaces/comentario'

export const getComentarios = async (id: number): Promise<Comentario[]> => {
  const { data } = await timbradoApi.get<Comentario[]>(`/comentarios-trip/${id}`)
  return data
}

import timbradoApi from '@/api/timbrado-api'
import type { CodigoPostal } from '@/interfaces/codigo_postal.model'

export const getCodigos = async (codigo: string): Promise<CodigoPostal[]> => {
  const { data } = await timbradoApi.get<CodigoPostal[]>(`/codigo_postal/${codigo}`)

  return data
}

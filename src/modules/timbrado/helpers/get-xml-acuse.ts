import timbradoApi from '@/api/timbrado-api'
import type { Acuse } from '@/interfaces/acuse.model'

export const getXmlAcuse = async (id: number): Promise<Acuse> => {
  const { data } = await timbradoApi.get<Acuse>(`/get-xml-acuse/${id}`)

  return data
}

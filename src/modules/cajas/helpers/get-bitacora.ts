import timbradoApi from '@/api/timbrado-api'
import type { Bitacora } from '@/modules/cajas/interfaces/bitacora'

export const getBitacora = async (numero_economico: string): Promise<Bitacora[]> => {
  const { data } = await timbradoApi.get<Bitacora[]>(`/cajas/ubicaciones/${numero_economico}`)

  return data
}

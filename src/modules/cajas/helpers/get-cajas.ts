import timbradoApi from '@/api/timbrado-api'
import type { Caja } from '@/modules/cajas/interfaces/caja'

export const getCajas = async (): Promise<Caja[]> => {
  const { data } = await timbradoApi.get<Caja[]>(`/cajas`)

  return data
}

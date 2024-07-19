import timbradoApi from '@/api/timbrado-api'
import type { Caja } from '@/modules/cajas/interfaces/caja'

export const getCaja = async (id: number): Promise<Caja> => {
  const { data } = await timbradoApi.get<Caja>(`/cajas/${id}`)

  return data
}

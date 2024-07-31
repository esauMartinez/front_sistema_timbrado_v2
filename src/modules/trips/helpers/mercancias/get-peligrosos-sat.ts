import timbradoApi from '@/api/timbrado-api'
import type { UnidadPeso } from '@/modules/timbrado/interfaces/unidad-peso'

export const getPeligrosos = async (peligroso: string): Promise<UnidadPeso[]> => {
  if (peligroso !== undefined && peligroso !== '') {
    const { data } = await timbradoApi.get<UnidadPeso[]>(`/sat-materiales-peligrosos/${peligroso}`)

    return data
  }
  return []
}

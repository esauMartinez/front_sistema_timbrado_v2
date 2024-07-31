import timbradoApi from '@/api/timbrado-api'
import type { UnidadPeso } from '@/modules/timbrado/interfaces/unidad-peso'

export const getUnidades = async (nombre: string): Promise<UnidadPeso[]> => {
  if (nombre !== undefined && nombre !== '') {
    const { data } = await timbradoApi.get<UnidadPeso[]>(`/sat-unidades-peso/${nombre}`)

    return data
  }
  return []
}

import timbradoApi from '@/api/timbrado-api'
import type { Marca } from '@/modules/marcas/interface/marca'

export const getMarcas = async (tipo: string): Promise<Marca[]> => {
  const { data } = await timbradoApi.get<Marca[]>(`/marcas/${tipo}`)
  return data
}

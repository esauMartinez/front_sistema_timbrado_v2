import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Marca } from '@/modules/marcas/interface/marca'

export const createMarca = async (marca: Marca): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>('/marcas', marca)

  return data
}

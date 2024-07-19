import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Rol } from '@/modules/roles/interfaces/rol'

export const postRol = async (rol: Rol): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(`/roles`, rol)

  return data
}

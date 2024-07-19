import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Rol } from '@/modules/roles/interfaces/rol'

export const updateRol = async (rol: Rol): Promise<ResponseData> => {
  const { data } = await timbradoApi.put<ResponseData>(`/roles/${rol.id}`, rol)

  return data
}

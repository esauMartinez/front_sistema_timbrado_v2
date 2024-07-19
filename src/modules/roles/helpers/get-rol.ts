import timbradoApi from '@/api/timbrado-api'
import type { Rol } from '@/modules/roles/interfaces/rol'

export const getRol = async (id: number): Promise<Rol> => {
  const { data } = await timbradoApi.get<Rol>(`/roles/${id}`)
  return data
}

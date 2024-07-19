import timbradoApi from '@/api/timbrado-api'
import type { Rol } from '@/modules/roles/interfaces/rol'

export const getRoles = async (): Promise<Rol[]> => {
  const { data } = await timbradoApi.get<Rol[]>('/roles')

  return data
}

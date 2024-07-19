import timbradoApi from '@/api/timbrado-api'
import type { Usuario } from '@/modules/usuarios/interfaces/usuarios'

export const getUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await timbradoApi.get<Usuario[]>(`/usuarios`)

  return data
}

import timbradoApi from '@/api/timbrado-api'
import type { Usuario } from '@/modules/usuarios/interfaces/usuarios'

export const getUsuario = async (id: number): Promise<Usuario> => {
  const { data } = await timbradoApi.get<Usuario>(`/usuarios/${id}`)

  return data
}

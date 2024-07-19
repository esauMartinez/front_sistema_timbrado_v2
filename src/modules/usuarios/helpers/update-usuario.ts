import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Usuario } from '@/modules/usuarios/interfaces/usuarios'

export const updateUsuario = async (usuario: Usuario): Promise<ResponseData> => {
  const { data } = await timbradoApi.put(`/usuarios/${usuario.id}`, usuario)

  return data
}

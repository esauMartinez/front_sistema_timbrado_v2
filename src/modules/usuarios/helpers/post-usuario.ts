import timbradoApi from '@/api/timbrado-api'
import type { ResponseData } from '@/interfaces/response-data'
import type { Usuario } from '@/modules/usuarios/interfaces/usuarios'

export const postUsuario = async (usuario: Usuario): Promise<ResponseData> => {
  const { data } = await timbradoApi.post<ResponseData>(`/usuarios`, usuario)
  return data
}

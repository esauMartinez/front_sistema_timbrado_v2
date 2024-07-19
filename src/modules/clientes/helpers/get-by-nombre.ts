import timbradoApi from '@/api/timbrado-api'
import type { Cliente } from '../interfaces/cliente'

export const getClientesPorNombre = async (nombre: string): Promise<Cliente[]> => {
  const { data } = await timbradoApi.get<Cliente[]>(`/clientes-por-nombre/${nombre}`)
  return data
}

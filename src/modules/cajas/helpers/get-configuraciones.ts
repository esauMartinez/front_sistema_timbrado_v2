import timbradoApi from '@/api/timbrado-api'
import type { Configuracion } from '@/modules/marcas/interface/configuracion'

export const getConfiguracion = async (): Promise<Configuracion[]> => {
  const { data } = await timbradoApi.get<Configuracion[]>('/configuraciones/CAJA')

  return data
}

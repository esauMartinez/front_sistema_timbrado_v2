import timbradoApi from '@/api/timbrado-api'
import type { Caja } from '@/modules/cajas/interfaces/caja'

export const getCajasPorNumeroEconomico = async (economico: string): Promise<Caja[]> => {
  const { data } = await timbradoApi.get<Caja[]>(`/cajas-por-numero-economico/${economico}`)
  return data
}

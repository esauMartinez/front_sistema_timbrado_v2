import timbradoApi from '@/api/timbrado-api'
import type { Tractor } from '@/modules/tractores/interfaces/tractor'

export const getTractoresPorNumeroEconomico = async (economico: string): Promise<Tractor[]> => {
  if (economico !== undefined && economico !== '') {
    const { data } = await timbradoApi.get<Tractor[]>(
      `/tractores-por-numero-economico/${economico}`
    )
    return data
  }

  return []
}

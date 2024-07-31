import timbradoApi from '@/api/timbrado-api'
import type { MercanciaSat } from '@/modules/timbrado/interfaces/mercancia-sat'

export const getMercancias = async (mercancia: string): Promise<MercanciaSat[]> => {
  if (mercancia !== undefined && mercancia !== '') {
    const { data } = await timbradoApi.get<MercanciaSat[]>(`/sat-mercancias/${mercancia}`)

    return data
  }

  return []
}

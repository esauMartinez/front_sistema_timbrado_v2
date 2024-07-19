import timbradoApi from '@/api/timbrado-api'
import type { Modulo } from '@/modules/roles/interfaces/modulo'
import type { Permiso } from '@/modules/roles/interfaces/permiso'

export const getModulos = async (): Promise<Modulo[]> => {
  const { data } = await timbradoApi.get<Modulo[]>('/modulos')
  data.forEach((x) => {
    x.permisos.forEach((y: Permiso) => {
      y.seleccionado = false
    })
  })

  return data
}

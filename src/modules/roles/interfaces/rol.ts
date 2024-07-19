import type { Permiso } from '@/modules/roles/interfaces/permiso'

export interface Rol {
  id: number
  nombre: string
  permisos: Permiso[]
}

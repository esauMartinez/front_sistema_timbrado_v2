import type { Permiso } from "./permiso"

export interface Modulo {
  id: number
  nombre: string
  descripcion: string
  permisos: Permiso[]
}

import type { Modulo } from './modulo'

export interface Permiso {
  id: number
  nombre: string
  descripcion: string
  modulo_id: number
  seleccionado: boolean
  modulo: Modulo
}

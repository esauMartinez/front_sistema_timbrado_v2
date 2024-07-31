import type { Patio } from '@/modules/patios/interfaces/patio'

export interface Movimiento {
  id: number
  numero_movimiento: number
  patio_id: number
  localizacion_caja: boolean
  patio_timbre: boolean
  trip_id: number
  patio: Patio
}

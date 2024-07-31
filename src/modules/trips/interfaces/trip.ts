import type { Cliente } from '@/modules/clientes/interfaces/cliente'
import type { Movimiento } from './movimiento'
import type { Operador } from '@/modules/operadores/interfaces/operador'
import type { Caja } from '@/modules/cajas/interfaces/caja'
import type { Tractor } from '@/modules/tractores/interfaces/tractor'
import type { Mercancia } from './mercancia'
import type { Timbre } from './timbre'
import type { Concepto } from './concepto'
import type { Empresa } from '@/interfaces/empresa.model'
import type { RegimenAduanero } from './regimenAduanero'

export interface Trip {
  id: number
  estatus: string
  observaciones_cancelacion: string
  tipo: string
  numero_cotizacion: string
  moneda: string
  tipo_cambio: string
  tipo_viaje: string
  numero_trip: number
  metodo_pago: string
  forma_pago: string
  uso_CFDI: string
  fecha_salida: Date
  fecha_llegada: Date
  cliente_id: number
  cliente: Cliente
  operador_id: number
  operador: Operador
  caja_id: number
  caja: Caja
  tractor_id: number
  tractor: Tractor
  origen_id: number
  destino_id: number
  ventana_carga: Date
  ventana_entrega: Date
  kilometros: number
  combustible: number
  viaticos: number
  casetas: number
  regimen_aduanero: string
  referencia: string
  observaciones: string
  createdAt: Date
  dia_grafica: string
  isTimbrado: boolean
  ErrorMovimientos: string
  empresa: Empresa
  movimientos: Movimiento[]
  mercancias: Mercancia[]
  timbres: Timbre[]
  conceptos: Concepto[]
  regimen_aduaneros: RegimenAduanero[]
}

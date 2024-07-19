export interface Trip {
  id: number
  estatus: string
  observaciones_cancelacion: string
  tipo: string
  numero_cotizacion: string
  moneda: string
  tipo_viaje: string
  numero_trip: number
  metodo_pago: string
  forma_pago: string
  uso_CFDI: string
  fecha_salida: Date
  fecha_llegada: Date
  cliente_id: number
  operador_id: number
  caja_id: number
  tractor_id: number
  origen_id: number
  destino_id: number
  ventana_carga: Date
  ventana_entrega: Date
  kilometros: number | undefined
  combustible: number | undefined
  viaticos: number | undefined
  casetas: number | undefined
  regimen_aduanero: string
  referencia: string
  observaciones: string
  createdAt: Date
  isTimbrado: boolean
  ErrorMovimientos: string
}

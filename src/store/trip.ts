import { defineStore } from 'pinia'
import type { Patio } from '@/interfaces/patio.model'
import type { Movimiento } from '@/interfaces/movimiento.model'
import type { Operador } from '@/modules/operadores/interfaces/operador'
import type { Caja } from '@/interfaces/caja.model'
import type { Tractor } from '@/interfaces/tractor.model'
import type { Mercancia } from '@/interfaces/mercancia.model'
import type { Comentario, Trip } from '@/interfaces/trip'
import type { Empresa } from '@/interfaces/empresa.model'
import type { Concepto } from '@/interfaces/concepto.model'
import type { Timbre } from '@/interfaces/timbre.model'
import type { ErrorResponse } from '@/interfaces/errors/error'
import type { Cliente } from '@/modules/clientes/interfaces/cliente'

interface TripStore {
  trips: Trip[]
  trip: Trip
  cliente: Cliente
  empresa: Empresa
  operador: Operador
  tractor: Tractor
  caja: Caja
  timbre: Timbre
  conceptos: Concepto[]
  mercancias: Mercancia[]
  patios: Patio[]
  comentario: Comentario
  comentarios: Comentario[]
  nombre_cliente: string | null
  nombre_operador: string | null
  numero_economico_caja: string | null
  numero_economico_tractor: string | null
  movimientos: Movimiento[]
  movimiento: Movimiento
  estatusTrip: string
  pdf: string | null
  errors: Trip
}

export const useTripStore = defineStore('trip', {
  state: (): TripStore => ({
    trips: [],
    trip: {} as Trip,
    cliente: {} as Cliente,
    empresa: {} as Empresa,
    operador: {} as Operador,
    tractor: {} as Tractor,
    caja: {} as Caja,
    timbre: {} as Timbre,
    conceptos: [],
    mercancias: [],
    patios: [],
    comentario: {} as Comentario,
    comentarios: [],
    nombre_cliente: null,
    nombre_operador: null,
    numero_economico_caja: null,
    numero_economico_tractor: null,
    movimientos: [],
    movimiento: {} as Movimiento,
    estatusTrip: 'TODOS',
    pdf: null,
    errors: {} as Trip
  }),
  actions: {
    setEmpresa(empresa: Empresa) {
      this.empresa = empresa
    },
    setTrip(trip: Trip) {
      this.trip = trip
    },
    setCliente(cliente: Cliente) {
      this.cliente = cliente
      this.nombre_cliente = cliente?.razon_social
    },
    setOperador(operador: Operador) {
      this.operador = operador
      this.nombre_operador =
        operador?.nombre === undefined
          ? null
          : operador?.nombre + ' ' + operador?.paterno + ' ' + operador?.materno
    },
    setCaja(caja: Caja) {
      this.caja = caja
      this.numero_economico_caja = caja?.numero_economico
    },
    setTractor(tractor: Tractor) {
      this.tractor = tractor
      this.numero_economico_tractor = tractor?.numero_economico
    },
    setMovimientos(movimientos: Movimiento[]) {
      this.movimientos = movimientos
    },
    setTimbre(timbre: Timbre) {
      this.timbre = timbre
    },
    setPatios(patios: Patio[]) {
      this.patios = patios
    },
    setMercancias(mercancias: Mercancia[]) {
      this.mercancias = mercancias
    },
    setTrips(trips: Trip[]) {
      this.trips = trips
    },
    setComentario(comentario: Comentario) {
      this.comentario = comentario
    },
    setComentarios(comentarios: Comentario[]) {
      this.comentarios = comentarios
    },
    // setOrigen(origen: Patio) {
    //   this.origen = origen
    // },
    // setDestino(destino: Patio) {
    //   this.destino = destino
    // },
    addMovimientoToTrip(patio: Patio) {
      this.movimientos.push(patio)
    },
    setPDF(pdf: string) {
      this.pdf = pdf
    },
    setErrors(payload: ErrorResponse[]) {
      payload.forEach((x) => {
        this.errors[x.field] = x.message
      })
    },
    resetErrors() {
      this.errors = {} as Trip
    }
  }
})

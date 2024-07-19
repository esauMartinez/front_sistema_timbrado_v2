import type { Concepto } from '@/interfaces/concepto.model'
import type { Empresa } from '@/interfaces/empresa.model'
import type { ErrorResponse } from '@/interfaces/errors/error'
import type { Mercancia } from '@/interfaces/mercancia.model'
import type { Movimiento } from '@/interfaces/movimiento.model'
import type { Timbre } from '@/interfaces/timbre.model'
import type { Comentario } from '@/interfaces/trip'
import type { Caja } from '@/modules/cajas/interfaces/caja'
import type { Cliente } from '@/modules/clientes/interfaces/cliente'
import type { Operador } from '@/modules/operadores/interfaces/operador'
import type { Patio } from '@/modules/patios/interfaces/patio'
import type { Tractor } from '@/modules/tractores/interfaces/tractor'
import type { FormErrorTrip } from '@/modules/trips/interfaces/errors/form-error-trip'
import type { Trip } from '@/modules/trips/interfaces/trips'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTripStore = defineStore('trips', () => {
  const trip = ref<Trip>({} as Trip)
  const trips = ref<Trip[]>([])
  // datos extra del trip
  const cliente = ref<Cliente>({} as Cliente)
  const operador = ref<Operador>({} as Operador)
  const tractor = ref<Tractor>({} as Tractor)
  const caja = ref<Caja>({} as Caja)
  const empresa = ref<Empresa>({} as Empresa)
  const timbre = ref<Timbre>({} as Timbre)
  const conceptos = ref<Concepto>({} as Concepto)
  const mercancias = ref<Mercancia>({} as Mercancia)
  const patios = ref<Patio>({} as Patio)
  const movimiento = ref<Movimiento>({} as Movimiento)
  const moviemientos = ref<Movimiento[]>([])
  // comentarios para el trip
  const comentario = ref<Comentario>({} as Comentario)
  const comentarios = ref<Comentario[]>([])

  // const nombre_cliente = ref<string>('')
  // const nombre_operador = ref<string>('')
  // const numero_economico_caja = ref<string>('')
  // const numero_economico_tractor = ref<string>('')

  const estatus_trips = ref<string>('TODOS')

  const pdf = ref<string | null>(null)
  const errors = ref({} as FormErrorTrip)

  return {
    trip,
    trips,
    errors,

    setTrip(payload: Trip) {
      trip.value = payload
    },
    setTrips(payload: Trip[]) {
      trips.value = payload
    },
    resetErrors() {
      errors.value = {} as FormErrorTrip
    },
    setErrors(payload: ErrorResponse[]) {
      console.log(payload)
      payload.forEach((x: any) => {
        errors.value[x.field as keyof FormErrorTrip] = x.message
      })
    }
  }
})

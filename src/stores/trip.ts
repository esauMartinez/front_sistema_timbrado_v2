import type { ErrorResponse } from '@/interfaces/errors/error'
import type { Patio } from '@/modules/patios/interfaces/patio'
import type { Bitacora } from '@/modules/trips/interfaces/bitacora'
import type { Comentario } from '@/modules/trips/interfaces/comentario'
import type { Concepto } from '@/modules/trips/interfaces/concepto'
import type { FormErrorConcepto } from '@/modules/trips/interfaces/errors/form-error-concepto'
import type { FormErrorMercancia } from '@/modules/trips/interfaces/errors/form-error-mercancia'
import type { FormErrorTrip } from '@/modules/trips/interfaces/errors/form-error-trip'
import type { Mercancia } from '@/modules/trips/interfaces/mercancia'
import type { Movimiento } from '@/modules/trips/interfaces/movimiento'
import type { Timbre } from '@/modules/trips/interfaces/timbre'
import type { Trip } from '@/modules/trips/interfaces/trip'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTripStore = defineStore('trips', () => {
  const trip = ref<Trip>({} as Trip)
  const trips = ref<Trip[]>([])
  // bitacora del trip
  const bitacora = ref<Bitacora[]>([])
  // comentarios para el trip
  const comentario = ref<Comentario>({} as Comentario)
  const comentarios = ref<Comentario[]>([])
  // mercancias del trip
  const mercancia = ref<Mercancia>({} as Mercancia)
  const mercancias = ref<Mercancia[]>([])
  // conceptos del trip
  const concepto = ref<Concepto>({} as Concepto)
  const conceptos = ref<Concepto[]>([])
  // timbres del trip
  const timbres = ref<Timbre[]>([])
  // estatus para traer todos los trips
  const estatus_trips = ref<string>('TODOS')
  // variable para meter la informacion del trip y generar un pdf
  const pdf = ref<string>('')
  const errors = ref({} as FormErrorTrip)
  const errorsMercancia = ref({} as FormErrorMercancia)
  const errorsConcepto = ref({} as FormErrorConcepto)
  

  return {
    estatus_trips,
    pdf,
    trip,
    trips,
    errors,
    bitacora,
    comentario,
    comentarios,
    mercancia,
    mercancias,
    errorsMercancia,
    concepto,
    conceptos,
    errorsConcepto,
    timbres,
    

    setTrip(payload: Trip) {
      trip.value = payload
    },
    setTrips(payload: Trip[]) {
      trips.value = payload
    },
    setPdf(payload: string) {
      pdf.value = payload
    },
    setBitacora(payload: Bitacora[]) {
      bitacora.value = payload
    },
    setMercancia(payload: Mercancia) {
      mercancia.value = payload
    },
    setConcepto(payload: Concepto) {
      concepto.value = payload
    },
    setComentarios(payload: Comentario[]) {
      comentarios.value = payload
    },
    setTimbres(payload: Timbre[]) {
      timbres.value = payload
    },
    addMovimiento(payload: Patio) {
      if (trip.value.movimientos === undefined) {
        trip.value.movimientos = []
      }
      const a: Movimiento = {
        id: trip.value.movimientos === undefined ? 1 : trip.value.movimientos.length + 1,
        numero_movimiento:
          trip.value.movimientos === undefined ? 1 : trip.value.movimientos.length + 1,
        patio_id: payload.id,
        localizacion_caja: false,
        patio_timbre: false,
        trip_id: 0,
        patio: payload
      }
      trip.value.movimientos.push(a)
    },
    removeMovimiento(id: number) {
      trip.value.movimientos = trip.value.movimientos.filter((x) => x.id !== id)
    },
    setMovimientoTimbre(id: number) {
      trip.value.movimientos = trip.value.movimientos.map((x) => {
        if (x.id === id) {
          x.patio_timbre = !x.patio_timbre
        }

        return x
      })
    },
    setMovimientoLocalizacionCaja(id: number) {
      trip.value.movimientos = trip.value.movimientos.map((x) => {
        if (x.id !== id) {
          x.localizacion_caja = false
        } else {
          x.localizacion_caja = !x.localizacion_caja
        }

        return x
      })
    },
    resetErrors() {
      errors.value = {} as FormErrorTrip
    },
    resetErrorsMercancia() {
      errorsMercancia.value = {} as FormErrorMercancia
    },
    resetErrorsConcepto() {
      errorsConcepto.value = {} as FormErrorConcepto
    },
    setErrors(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errors.value[x.field as keyof FormErrorTrip] = x.message
      })
    },
    setErrorsMercancia(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errorsMercancia.value[x.field as keyof FormErrorMercancia] = x.message
      })
    },
    setErrorsConcepto(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errorsConcepto.value[x.field as keyof FormErrorConcepto] = x.message
      })
    }
  }
})

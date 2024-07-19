import type { ErrorResponse } from '@/interfaces/errors/error'
import type { CodigoPostal } from '@/modules/patios/interfaces/codigoPostal'
import type { FormErrorPatio } from '@/modules/patios/interfaces/errors/form-error-patio'
import type { Patio } from '@/modules/patios/interfaces/patio'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePatioStore = defineStore('patios', () => {
  const patio = ref<Patio>({} as Patio)
  const patios = ref<Patio[]>([])
  const codigosPostal = ref<CodigoPostal[]>([])
  const errors = ref({} as FormErrorPatio)

  return {
    // state
    patio,
    patios,
    codigosPostal,
    errors,

    // actions
    setPatio(payload: Patio) {
      patio.value = payload
    },
    setPatios(payload: Patio[]) {
      patios.value = payload
    },
    setCodigos(payload: CodigoPostal[]) {
      codigosPostal.value = payload
    },
    resetErrors() {
      errors.value = {} as Patio
    },
    setErrors(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errors.value[x.field as keyof FormErrorPatio] = x.message
      })
    }
  }
})

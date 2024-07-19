import type { ErrorResponse } from '@/interfaces/errors/error'
import type { Configuracion } from '@/modules/marcas/interface/configuracion'
import type { FormErrorTractor } from '@/modules/tractores/interfaces/errors/form-error-tractor'
import type { Tractor } from '@/modules/tractores/interfaces/tractor'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTractorStore = defineStore('tractores', () => {
  const tractores = ref<Tractor[]>([])
  const tractor = ref<Tractor>({} as Tractor)
  const configuracion = ref<Configuracion[]>([])
  const errors = ref({} as FormErrorTractor)

  return {
    tractores,
    tractor,
    configuracion,
    errors,

    setTractor(payload: Tractor) {
      tractor.value = payload
    },
    setTractores(payload: Tractor[]) {
      tractores.value = payload
    },
    setConfiguracion(payload: Configuracion[]) {
      configuracion.value = payload
    },
    setErrors(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errors.value[x.field as keyof FormErrorTractor] = x.message
      })
    },
    resetErrors() {
      errors.value = {} as FormErrorTractor
    }
  }
})

import type { ErrorResponse } from '@/interfaces/errors/error'
import type { FormErrorServicio } from '@/modules/servicios/interfaces/erros/form-error-servicio'
import type { Servicio } from '@/modules/servicios/interfaces/servicio'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useServicioStore = defineStore('servicios', () => {
  const servicio = ref<Servicio>({} as Servicio)
  const servicios = ref<Servicio[]>([])
  const errors = ref({} as FormErrorServicio)

  return {
    //state
    servicio,
    servicios,
    errors,

    // actions
    setServicio(payload: Servicio) {
      servicio.value = payload
    },
    setServicios(payload: Servicio[]) {
      servicios.value = payload
    },
    resetErrors() {
      errors.value = {} as FormErrorServicio
    },
    setErrors(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errors.value[x.field as keyof FormErrorServicio] = x.message
      })
    }
  }
})

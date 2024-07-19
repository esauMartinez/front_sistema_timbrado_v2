import type { ErrorResponse } from '@/interfaces/errors/error'
import type { Bitacora } from '@/modules/cajas/interfaces/bitacora'
import type { Caja } from '@/modules/cajas/interfaces/caja'
import type { FormErrorCaja } from '@/modules/cajas/interfaces/errors/form-error-caja'
import type { Configuracion } from '@/modules/marcas/interface/configuracion'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCajaStore = defineStore('cajas', () => {
  const cajas = ref<Caja[]>([])
  const caja = ref<Caja>({} as Caja)
  const configuracion = ref<Configuracion[]>([])
  const bitacora = ref<Bitacora[]>([])
  const errors = ref({} as FormErrorCaja)

  return {
    cajas,
    caja,
    configuracion,
    bitacora,
    errors,

    setCaja(payload: Caja) {
      caja.value = payload
    },
    setCajas(payload: Caja[]) {
      cajas.value = payload
    },
    setConfiguracion(payload: Configuracion[]) {
      configuracion.value = payload
    },
    setBitacora(payload: Bitacora[]) {
      bitacora.value = payload
    },
    setErrors(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errors.value[x.field as keyof FormErrorCaja] = x.message
      })
    },
    resetErrors() {
      errors.value = {} as FormErrorCaja
    }
  }
})

import type { ErrorResponse } from '@/interfaces/errors/error'
import type { FormErrorMarca } from '@/modules/marcas/interface/errors/form-error-marca'
import type { Marca } from '@/modules/marcas/interface/marca'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMarcaStore = defineStore('marcas', () => {
  const marca = ref<Marca>({} as Marca)
  const marcas = ref<Marca[]>([])
  const errors = ref({} as FormErrorMarca)

  return {
    marca,
    marcas,

    setMarca(payload: Marca) {
      marca.value = payload
    },
    setMarcas(payload: Marca[]) {
      marcas.value = payload
    },
    setErrors(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errors.value[x.field as keyof FormErrorMarca] = x.message
      })
    },
    resetErrors() {
      errors.value = {} as FormErrorMarca
    }
  }
})

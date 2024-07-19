import { defineStore } from 'pinia'
import type { ErrorResponse } from '@/interfaces/errors/error'
import { ref } from 'vue'
import type { Operador } from '@/modules/operadores/interfaces/operador'
import type { FormErrorOperador } from '@/modules/operadores/interfaces/errors/form-error-operador'

export const useOperadorStore = defineStore('operadores', () => {
  const operadores = ref<Operador[]>([])
  const operador = ref<Operador>({} as Operador)
  const errors = ref({} as FormErrorOperador)
  const gafete = ref<File>()

  return {
    //state
    operadores,
    operador,
    errors,
    gafete,

    // actions
    setOperador(payload: Operador) {
      operador.value = payload
    },
    setOperadores(payload: Operador[]) {
      operadores.value = payload
    },
    setGafete(payload: File) {
      gafete.value = payload
    },
    resetErrors() {
      errors.value = {} as Operador
    },
    setErrors(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errors.value[x.field as keyof FormErrorOperador] = x.message
      })
    }
  }
})

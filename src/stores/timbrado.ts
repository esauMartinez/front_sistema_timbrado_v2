import type { ErrorResponse } from '@/interfaces/errors/error'
import type { Cancelacion } from '@/modules/timbrado/interfaces/cancelacion-sat'
import type { ErrorTimbrado } from '@/modules/timbrado/interfaces/errors/error-timbrado'
import type { MercanciaSat } from '@/modules/timbrado/interfaces/mercancia-sat'
import type { Peligroso } from '@/modules/timbrado/interfaces/peligroso'
import type { UnidadPeso } from '@/modules/timbrado/interfaces/unidad-peso'
import type { FormErrorRegimen } from '@/modules/trips/interfaces/errors/form-error-regimen'
import type { RegimenAduanero } from '@/modules/trips/interfaces/regimenAduanero'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTimbradoStore = defineStore('timbrado', () => {
  const mercanciaSat = ref<MercanciaSat>({} as MercanciaSat)
  const mercanciasSat = ref<MercanciaSat[]>([])
  const unidades = ref<UnidadPeso[]>([])
  const errors = ref({} as ErrorTimbrado)
  // materiales peligrosos
  const materialesPeligrososSat = ref<Peligroso[]>([])
  // variable para meter la informacion del trip y generar un pdf
  const pdf = ref<string>('')
  // cancelacion
  const cancelacion = ref<Cancelacion>({} as Cancelacion)
  // tipo de cambio
  const tipo_cambio = ref<string | undefined>()
  const regimen = ref<RegimenAduanero>({} as RegimenAduanero)
  const errorRegimen = ref<FormErrorRegimen>({} as FormErrorRegimen)

  return {
    mercanciaSat,
    mercanciasSat,
    materialesPeligrososSat,
    unidades,
    pdf,
    cancelacion,
    errors,
    tipo_cambio,
    regimen,
    errorRegimen,

    setMercanciasSat(payload: MercanciaSat[]) {
      mercanciasSat.value = payload
    },
    setUnidades(payload: UnidadPeso[]) {
      unidades.value = payload
    },
    setMaterialesPeligrosos(payload: Peligroso[]) {
      materialesPeligrososSat.value = payload
    },
    setPdf(payload: string) {
      pdf.value = payload
    },
    setTipoCambio(payload: string) {
      tipo_cambio.value = payload
    },
    setErrors(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errors.value[x.field as keyof ErrorTimbrado] = x.message
      })
    },
    resetErrors() {
      errors.value = {} as ErrorTimbrado
    },
    setErrorRegimen(payload: ErrorResponse[]) {
      payload.forEach((x: any) => {
        errorRegimen.value[x.field as keyof FormErrorRegimen] = x.message
      })
    },
    resetErrorRegimen() {
      errorRegimen.value = {} as FormErrorRegimen
    }
  }
})

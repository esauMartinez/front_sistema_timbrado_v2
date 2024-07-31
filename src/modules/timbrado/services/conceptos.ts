import type { Concepto } from '@/modules/trips/interfaces/concepto'

export const generateConceptos = (conceptos: Concepto[]) => {
  const array: any = []
  conceptos.forEach((concepto: Concepto) => {
    const total = +concepto.monto + +concepto.iva - +concepto.retencion
    const c = [
      { text: 1, fontSize: 8 },
      { text: concepto.clave, fontSize: 8 },
      { text: '', fontSize: 8 },
      { text: concepto.nombre, fontSize: 8 },
      { text: concepto.monto, fontSize: 8 },
      { text: concepto.iva, fontSize: 8 },
      { text: concepto.retencion, fontSize: 8 },
      { text: total, fontSize: 8 }
    ]
    array.push(c)
  })
  return array
}

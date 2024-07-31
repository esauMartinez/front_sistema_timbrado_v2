import type { Mercancia } from '@/modules/trips/interfaces/mercancia'

export const generateMercancias = async (mercancias: Mercancia[]): Promise<any> => {
  const array: any = []

  mercancias.forEach((mercancia: Mercancia) => {
    const m = [
      { text: mercancia.producto, fontSize: 8 },
      { text: mercancia.unidad_medida, fontSize: 8 },
      { text: mercancia.peso, fontSize: 8 },
      { text: mercancia.cantidad, fontSize: 8 },
      { text: mercancia.material_peligroso, fontSize: 8 },
      { text: mercancia.tipo_documento, fontSize: 8 },
      { text: mercancia.tipo_materia, fontSize: 8 },
      { text: mercancia.pedimento, fontSize: 8 },
      { text: mercancia.fraccion_arancelaria, fontSize: 8 },
      { text: mercancia.descripcion_materia, fontSize: 8 },
      { text: mercancia.identificador_documento_aduanero, fontSize: 8 }
    ]

    array.push(m)
  })
  
  return array
}

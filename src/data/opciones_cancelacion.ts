import { ref } from 'vue'

export const opciones_cancelacion = ref([
  {
    opcion: '01',
    descripcion: 'Comprobante emitido con errores con relacion'
  },
  { opcion: '02', descripcion: 'Comprobante emitido con errores sin relacion' },
  { opcion: '03', descripcion: 'No se llevo a cabo la operacion' },
  {
    opcion: '04',
    descripcion: 'Operacion nominativa relacionada en la factura global'
  }
])

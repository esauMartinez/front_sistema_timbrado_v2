import * as pdfMake from 'pdfmake/build/pdfmake'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { getTrip } from '@/modules/trips/helpers/get-trip'
import { pdfTimbre } from '@/modules/timbrado/services/pdf'
import { useTimbradoStore } from '@/stores/timbrado'

export const usePdf = (id: number) => {
  const timbradoStore = useTimbradoStore()

  const { pdf } = storeToRefs(timbradoStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['trip', id],
    queryFn: () => getTrip(id)
  })

  watch(
    data,
    async (payload) => {
      if (payload) {
        const docDefinition = await pdfTimbre(
          payload.empresa,
          payload,
          payload.operador,
          payload.tractor,
          payload.cliente,
          payload.caja,
          payload.movimientos[0].patio,
          payload.movimientos[1].patio,
          payload.mercancias,
          payload.timbres[0],
          payload.conceptos
        )

        const pdfDocGenerator = pdfMake.createPdf(docDefinition)
        pdfDocGenerator.getDataUrl(async (dataUrl) => {
          timbradoStore.setPdf(dataUrl)
        })
      }
    },
    { immediate: true }
  )

  return {
    pdf,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

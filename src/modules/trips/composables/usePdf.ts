import * as pdfMake from 'pdfmake/build/pdfmake'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useTripStore } from '@/stores/trip'
import { getTrip } from '@/modules/trips/helpers/get-trip'
import { pdfTrip } from '@/modules/trips/services/pdf'

export const usePdf = (id: number) => {
  const tripStore = useTripStore()

  const { pdf } = storeToRefs(tripStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['trip', id],
    queryFn: () => getTrip(id)
  })

  watch(
    data,
    async (payload) => {
      if (payload) {
        const docDefinition = await pdfTrip(
          payload.empresa,
          payload,
          payload.operador,
          payload.tractor,
          payload.cliente,
          payload.caja,
          payload.movimientos[0].patio,
          payload.movimientos[1].patio,
          payload.mercancias,
          payload.timbres[0]
        )

        const pdfDocGenerator = pdfMake.createPdf(docDefinition)
        pdfDocGenerator.getDataUrl(async (dataUrl) => {
          tripStore.setPdf(dataUrl)
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

import { useTimbradoStore } from '@/stores/timbrado'
import { storeToRefs } from 'pinia'
import { getMercancias } from '@/modules/trips/helpers/mercancias/get-mercancias-sat'
import { useQuery } from '@tanstack/vue-query'
import { useTripStore } from '@/stores/trip'
import { computed, watch } from 'vue'

export const useMercancias = () => {
  const timbradoStore = useTimbradoStore()
  const tripStore = useTripStore()
  const { mercancia } = storeToRefs(tripStore)

  const { mercanciasSat } = storeToRefs(timbradoStore)

  const {
    data,
    isLoading,
    refetch: refetchMercancias
  } = useQuery({
    queryKey: ['clientesByName', mercancia.value.producto],
    queryFn: () => getMercancias(mercancia.value.producto),
    enabled: false
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        timbradoStore.setMercanciasSat(payload.map((x) => ({ ...x })))
      }
    },
    { immediate: true }
  )

  return {
    mercanciasSat,
    isLoading: computed(() => isLoading.value),

    refetchMercancias
  }
}

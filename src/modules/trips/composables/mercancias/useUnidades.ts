import { useTimbradoStore } from '@/stores/timbrado'
import { storeToRefs } from 'pinia'
import { getUnidades } from '@/modules/trips/helpers/mercancias/get-unidades-sat'
import { useTripStore } from '@/stores/trip'
import { useQuery } from '@tanstack/vue-query'
import { computed, watch } from 'vue'

export const useUnidades = () => {
  const timbradoStore = useTimbradoStore()
  const tripStore = useTripStore()
  const { mercancia } = storeToRefs(tripStore)
  const { unidades } = storeToRefs(timbradoStore)

  const {
    data,
    isLoading,
    refetch: refetchUnidades
  } = useQuery({
    queryKey: ['clientesByName', mercancia.value.unidad_medida],
    queryFn: () => getUnidades(mercancia.value.unidad_medida),
    enabled: false
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        timbradoStore.setUnidades(payload.map((x) => ({ ...x })))
      }
    },
    { immediate: true }
  )

  return {
    unidades,
    isLoading: computed(() => isLoading.value),

    refetchUnidades
  }
}

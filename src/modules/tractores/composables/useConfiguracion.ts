import { useTractorStore } from '@/stores/tractor'
import { storeToRefs } from 'pinia'
import { getConfiguracion } from '../helpers/get-configuraciones'
import { computed, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'

export const useConfiguracion = () => {
  const tractorStore = useTractorStore()
  const { configuracion } = storeToRefs(tractorStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['configuracion'],
    queryFn: getConfiguracion
  })

  watch(
    data,
    (payload) => {
      if (payload) tractorStore.setConfiguracion(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    configuracion,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

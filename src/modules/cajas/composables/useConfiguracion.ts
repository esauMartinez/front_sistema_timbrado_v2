import { storeToRefs } from 'pinia'
import { getConfiguracion } from '@/modules/cajas/helpers/get-configuraciones'
import { computed, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useCajaStore } from '@/stores/caja'

export const useConfiguracion = () => {
  const cajaStore = useCajaStore()
  const { configuracion } = storeToRefs(cajaStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['configuracion'],
    queryFn: getConfiguracion
  })

  watch(
    data,
    (payload) => {
      if (payload) cajaStore.setConfiguracion(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    configuracion,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

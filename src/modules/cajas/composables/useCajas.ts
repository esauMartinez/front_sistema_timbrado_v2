import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { getCajas } from '@/modules/cajas/helpers/get-cajas'
import { useCajaStore } from '@/stores/caja'

export const useCajas = () => {
  const cajaStore = useCajaStore()

  const { cajas } = storeToRefs(cajaStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['cajas'],
    queryFn: getCajas
  })

  watch(
    data,
    (payload) => {
      if (payload) cajaStore.setCajas(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    cajas,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

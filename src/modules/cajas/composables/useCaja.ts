import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useCajaStore } from '@/stores/caja'
import { getCaja } from '@/modules/cajas/helpers/get-caja'

export const useCaja = (id: number) => {
  const cajaStore = useCajaStore()
  const { caja } = storeToRefs(cajaStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['caja', id],
    queryFn: () => getCaja(id)
  })

  watch(
    data,
    (payload) => {
      if (payload) cajaStore.setCaja({ ...payload })
    },
    { immediate: true }
  )

  return {
    caja,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

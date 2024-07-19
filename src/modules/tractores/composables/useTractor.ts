import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useTractorStore } from '@/stores/tractor'
import { getTractor } from '../helpers/get-tractor'

export const useTractor = (id: number) => {
  const tractorStore = useTractorStore()
  const { tractor } = storeToRefs(tractorStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['tractor', id],
    queryFn: () => getTractor(id)
  })

  watch(
    data,
    (payload) => {
      if (payload) tractorStore.setTractor({ ...payload })
    },
    { immediate: true }
  )

  return {
    tractor,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

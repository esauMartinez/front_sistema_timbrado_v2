import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useTractorStore } from '@/stores/tractor'
import { getTractores } from '../helpers/get-tractores'

export const useTractores = () => {
  const tractorStore = useTractorStore()

  const { tractores } = storeToRefs(tractorStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['tractores'],
    queryFn: getTractores
  })

  watch(
    data,
    (payload) => {
      if (payload) tractorStore.setTractores(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    tractores,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

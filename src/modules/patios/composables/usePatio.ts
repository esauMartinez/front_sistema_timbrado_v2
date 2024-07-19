import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { usePatioStore } from '@/stores/patio'
import { getPatio } from '../helpers/get-patio'

export const usePatio = (id: number) => {
  const patioStore = usePatioStore()
  const { patio } = storeToRefs(patioStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['patio', id],
    queryFn: () => getPatio(id)
  })

  watch(
    data,
    (payload) => {
      if (payload) patioStore.setPatio({ ...payload })
    },
    { immediate: true }
  )

  return {
    patio,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

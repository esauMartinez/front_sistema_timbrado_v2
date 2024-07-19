import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { usePatioStore } from '@/stores/patio'
import { getPatios } from '../helpers/get-patios'

export const usePatios = () => {
  const patioStore = usePatioStore()

  const { patios } = storeToRefs(patioStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['patios'],
    queryFn: getPatios
  })

  watch(
    data,
    (payload) => {
      if (payload) patioStore.setPatios(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    patios,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

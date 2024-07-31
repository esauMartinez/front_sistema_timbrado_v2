import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useTripStore } from '@/stores/trip'
import { getTrip } from '@/modules/trips/helpers/get-trip'

export const useTrip = (id: number) => {
  const tripStore = useTripStore()

  const { trip } = storeToRefs(tripStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['trip', id],
    queryFn: () => getTrip(id)
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        tripStore.setTrip({ ...payload, movimientos: payload?.movimientos.map((x) => ({ ...x })) })
      }
    },
    { immediate: true }
  )

  return {
    trip,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

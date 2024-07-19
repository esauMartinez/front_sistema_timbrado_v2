import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { getTrips } from '@/modules/trips/helpers/get-trips'
import { useTripStore } from '@/stores/trip'

export const useTrips = (estatus: string, from: string, to: string) => {
  const tripStore = useTripStore()

  const { trips } = storeToRefs(tripStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['trips'],
    queryFn: () => getTrips(estatus, from, to)
  })

  watch(
    data,
    (payload) => {
      if (payload) tripStore.setTrips(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    trips,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

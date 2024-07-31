import { useTripStore } from '@/stores/trip'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { getTimbres } from '../helpers/get-timbres'

export const useTimbres = (trip: number) => {
  const tripStore = useTripStore()
  const { timbres } = storeToRefs(tripStore)

  const timbresQuery = useQuery({
    queryKey: ['timbres', trip],
    queryFn: () => getTimbres(trip)
  })

  watch(
    timbresQuery.data,
    (payload) => {
      if (payload) tripStore.setTimbres(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    timbres,

    isLoading: timbresQuery.isLoading
  }
}

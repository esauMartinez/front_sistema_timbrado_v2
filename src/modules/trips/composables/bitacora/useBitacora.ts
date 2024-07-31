import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useTripStore } from '@/stores/trip'
import { getBitacora } from '@/modules/trips/helpers/bitacora/get-bitacora'

export const useBitacora = (id: number) => {
  const tripStore = useTripStore()

  const { bitacora } = storeToRefs(tripStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['bitacoraTrip', id],
    queryFn: () => getBitacora(id)
  })

  watch(
    data,
    (payload) => {
      if (payload) tripStore.setBitacora(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    bitacora,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

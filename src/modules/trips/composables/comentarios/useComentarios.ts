import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useTripStore } from '@/stores/trip'
import { getComentarios } from '@/modules/trips/helpers/comentarios/get-comentarios'

export const useComentarios = (id: number) => {
  const tripStore = useTripStore()

  const { comentarios } = storeToRefs(tripStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['comentariosTrip', id],
    queryFn: () => getComentarios(id)
  })

  watch(
    data,
    (payload) => {
      if (payload) tripStore.setComentarios(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    comentarios,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

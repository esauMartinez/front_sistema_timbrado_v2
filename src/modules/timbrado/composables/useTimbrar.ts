// import { question } from '@/helpers/messages'
import { errorTimbre } from '@/helpers/messages'
import { timbrarTrip } from '@/modules/timbrado/helpers/timbrar-trip'
import { useTripStore } from '@/stores/trip'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { computed, watch } from 'vue'
import type { ErrorTimbrado } from '../interfaces/errors/error-timbrado'

export const useTimbrar = () => {
  const tripStore = useTripStore()
  const { trip } = storeToRefs(tripStore)
  const toast = useToast()
  const queryClient = useQueryClient()

  const {
    isLoading,
    isSuccess,
    isError,
    error,
    refetch: refetchTimbrar
  } = useQuery({
    queryKey: ['timbradoTrip', trip.value.id],
    queryFn: () => timbrarTrip(trip.value.id),
    retry: false,
    enabled: false
  })

  watch(isSuccess, (payload) => {
    if (payload) {
      toast.add({
        severity: 'success',
        summary: 'Timbrado',
        detail: 'Trip timbrado correctamente',
        life: 3000
      })

      queryClient.invalidateQueries({
        queryKey: ['trips']
      })
    }
  })

  watch(error, (payload: any) => {
    if (payload) {
      errorTimbre(payload.response.data.errors.message, payload.response.data.errors.messageDetail)
    }
  })

  return {
    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value),
    isError: computed(() => isError.value),
    refetchTimbrar
  }
}

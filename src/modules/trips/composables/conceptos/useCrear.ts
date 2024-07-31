import { useTripStore } from '@/stores/trip'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { postConcepto } from '@/modules/trips/helpers/conceptos/create-concepto'
import { computed, watch } from 'vue'

export const useCrear = () => {
  const queryClient = useQueryClient()
  const tripStore = useTripStore()
  const { concepto, trip } = storeToRefs(tripStore)
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: postConcepto,
    onMutate: () => {
      tripStore.resetErrorsConcepto()
    },
    onError: (error: any) => {
      tripStore.setErrorsConcepto(error.response.data.errors)
    }
  })

  watch(crearMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['trip', trip.value.id]
      })
    }
  })

  watch(crearMutation.isError, (isError) => {
    if (isError) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error en campos',
        life: 3000
      })
    }
  })

  return {
    concepto,
    trip,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}

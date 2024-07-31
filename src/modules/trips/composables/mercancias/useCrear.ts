import { useTripStore } from '@/stores/trip'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { postMercancia } from '@/modules/trips/helpers/mercancias/create-mercancia'
import { computed, watch } from 'vue'

export const useCrear = () => {
  const queryClient = useQueryClient()
  const tripStore = useTripStore()
  const { mercancia, trip } = storeToRefs(tripStore)
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: postMercancia,
    onMutate: () => {
      tripStore.resetErrorsMercancia()
    },
    onError: (error: any) => {
      tripStore.setErrorsMercancia(error.response.data.errors)
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
    mercancia,
    trip,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}

import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import { createTrip } from '../helpers/create-trip'
import { useTripStore } from '@/stores/trip'

export const useCrear = () => {
  const queryClient = useQueryClient()
  const tripStore = useTripStore()
  const { trip } = storeToRefs(tripStore)
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: createTrip,
    onMutate: () => {
      tripStore.resetErrors()
    },
    onError: (error: any) => {
      tripStore.setErrors(error.response.data.errors)
    }
  })

  watch(crearMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['trips']
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
    trip,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}

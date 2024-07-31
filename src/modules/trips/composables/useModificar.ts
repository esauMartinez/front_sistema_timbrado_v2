import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useTripStore } from '@/stores/trip'
import { updateTrip } from '@/modules/trips/helpers/update-trip'

export const useModificar = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const tripStore = useTripStore()

  const updateMutation = useMutation({
    mutationFn: updateTrip,
    onMutate: () => {
      tripStore.resetErrors()
    },
    onError: (error: any) => {
      tripStore.setErrors(error.response.data.errors)
    }
  })

  watch(updateMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      toast.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: updateMutation.data.value!.data,
        life: 3000
      })

      queryClient.invalidateQueries({
        queryKey: ['trips']
      })
    }
  })

  watch(updateMutation.isError, (isError) => {
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
    isPending: computed(() => updateMutation.isPending.value),
    isSuccess: computed(() => updateMutation.isSuccess.value),

    updateMutation
  }
}

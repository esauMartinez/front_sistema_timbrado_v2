import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { deleteMercancia } from '@/modules/trips/helpers/mercancias/delete-mercancia'
import { useTripStore } from '@/stores/trip'
import { storeToRefs } from 'pinia'

export const useEliminar = () => {
  const queryClient = useQueryClient()
  const tripStore = useTripStore()
  const { trip } = storeToRefs(tripStore)
  const toast = useToast()

  const deleteMutation = useMutation({
    mutationFn: deleteMercancia
  })

  watch(deleteMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      toast.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: deleteMutation.data.value!.data,
        life: 3000
      })

      queryClient.invalidateQueries({
        queryKey: ['trip', trip.value.id]
      })
    }
  })

  return {
    isPending: computed(() => deleteMutation.isPending.value),

    deleteMutation
  }
}

import { useTripStore } from '@/stores/trip'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { deleteConcepto } from '@/modules/trips/helpers/conceptos/delete-concepto'
import { computed, watch } from 'vue'

export const useEliminar = () => {
  const queryClient = useQueryClient()
  const tripStore = useTripStore()
  const { trip } = storeToRefs(tripStore)
  const toast = useToast()

  const deleteMutation = useMutation({
    mutationFn: deleteConcepto
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

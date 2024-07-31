import { useTripStore } from '@/stores/trip'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { computed, watch } from 'vue'
import { deleteRegimenAduanero } from '@/modules/trips/helpers/regimen/delete-regimen'

export const useEliminar = () => {
  const queryClient = useQueryClient()
  const tripStore = useTripStore()
  const { trip } = storeToRefs(tripStore)
  const toast = useToast()

  const deleteMutation = useMutation({
    mutationFn: deleteRegimenAduanero
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

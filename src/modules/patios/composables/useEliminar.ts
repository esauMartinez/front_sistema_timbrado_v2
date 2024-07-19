import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { deletePatio } from '../helpers/delete-patio'

export const useEliminar = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const deleteMutation = useMutation({
    mutationFn: deletePatio
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
        queryKey: ['patios']
      })
    }
  })

  return {
    deleteMutation
  }
}

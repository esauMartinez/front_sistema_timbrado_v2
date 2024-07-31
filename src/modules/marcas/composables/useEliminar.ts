import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { deleteMarca } from '../helpers/delete-marca'

export const useEliminar = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const deleteMutation = useMutation({
    mutationFn: deleteMarca
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
        queryKey: ['marcas']
      })
    }
  })

  return {
    deleteMutation
  }
}

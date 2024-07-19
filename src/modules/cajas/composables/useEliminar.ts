import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { deleteCaja } from '@/modules/cajas/helpers/delete-caja'

export const useEliminar = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const deleteMutation = useMutation({
    mutationFn: deleteCaja
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
        queryKey: ['cajas']
      })
    }
  })

  return {
    deleteMutation
  }
}

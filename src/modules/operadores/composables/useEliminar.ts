import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteOperador } from '@/modules/operadores/helpers/delete-operador'
import { watch } from 'vue'
import { useToast } from 'primevue/usetoast'

export const useEliminar = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const eliminarMutation = useMutation({
    mutationFn: deleteOperador
  })

  watch(eliminarMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      toast.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: eliminarMutation.data.value!.data,
        life: 3000
      })

      queryClient.invalidateQueries({
        queryKey: ['operadores']
      })
    }
  })

  return {
    eliminarMutation
  }
}

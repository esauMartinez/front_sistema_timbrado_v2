import { useToast } from 'primevue/usetoast'
import { deleteCliente } from '@/modules/clientes/helpers/delete-cliente'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { watch } from 'vue'

const useEliminar = () => {
  const toast = useToast()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteCliente
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
        queryKey: ['clientes']
      })
    }
  })

  return {
    deleteMutation
  }
}

export default useEliminar

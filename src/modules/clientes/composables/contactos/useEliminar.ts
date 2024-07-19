import { deleteContacto } from '@/modules/clientes/helpers/delete-contacto'
import { useClienteStore } from '@/stores/cliente'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
// import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { watch } from 'vue'

const useEliminar = () => {
  const toast = useToast()
  // const confirm = useConfirm()
  const clienteStore = useClienteStore()
  const queryClient = useQueryClient()
  const { contacto } = storeToRefs(clienteStore)

  const deleteMutation = useMutation({
    mutationFn: deleteContacto
  })

  watch(deleteMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      toast.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Contacto eliminado',
        life: 3000
      })

      queryClient.invalidateQueries({
        queryKey: ['contactos', contacto.value.cliente_id]
      })
    }
  })

  return {
    deleteMutation
  }
}

export default useEliminar

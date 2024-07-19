import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { postCliente } from '@/modules/clientes/helpers/post-cliente'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useClienteStore } from '@/stores/cliente'
import { storeToRefs } from 'pinia'

const useCrear = () => {
  const clienteStore = useClienteStore()
  const { cliente } = storeToRefs(clienteStore)
  const queryClient = useQueryClient()
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: postCliente,
    onMutate: () => {
      clienteStore.resetErros()
    },
    onError: (error: any) => {
      clienteStore.setErrorsCliente(error.response.data.errors)
    }
  })

  watch(crearMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      toast.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: crearMutation.data.value!.data,
        life: 3000
      })

      queryClient.invalidateQueries({
        queryKey: ['clientes']
      })
    }
  })

  watch(crearMutation.isError, (isError) => {
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
    cliente,
    crearMutation,

    isLoading: computed(() => crearMutation.isPending.value),
    isCreated: computed(() => crearMutation.isSuccess.value)
  }
}

export default useCrear

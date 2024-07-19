import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { putCliente } from '@/modules/clientes/helpers/put-cliente'
import { computed, ref, watch } from 'vue'
import { useClienteStore } from '@/stores/cliente'
import { storeToRefs } from 'pinia'
import type { Cliente } from '@/modules/clientes/interfaces/cliente'
import { useToast } from 'primevue/usetoast'
import { comentarios } from '@/helpers/messages'

const useModificar = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const clienteStore = useClienteStore()
  const { clientes } = storeToRefs(clienteStore)
  const tipo_modificacion = ref<string>('formulario')

  const updateMutation = useMutation({
    mutationFn: putCliente,
    onMutate: () => {
      clienteStore.resetErros()
    },
    onError: (error: any) => {
      clienteStore.setErrorsCliente(error.response.data.errors)
    }
  })

  const modificar = async (cliente: Cliente, form: boolean = false) => {
    if (form) {
      cliente.evento = 'MODIFICACION'
      updateMutation.mutate(cliente)
    } else {
      const response_comentarios: any = await comentarios()
      if (response_comentarios.isConfirmed) {
        cliente.evento = cliente.estatus ? 'ACTIVACION' : 'DESACTIVACION'
        cliente.comentarios = response_comentarios.value

        updateMutation.mutate(cliente)
      } else {
        const data = clientes.value.map((x) => {
          if (x.id === cliente.id) {
            x.estatus = !cliente.estatus
          }
          return { ...x }
        })
        clienteStore.setClientes(data)
      }
    }
  }

  watch(updateMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      toast.add({
        severity: 'success',
        summary: 'Modificado',
        detail: updateMutation.data.value!.data,
        life: 3000
      })

      queryClient.invalidateQueries({
        queryKey: ['clientes']
      })
    }
  })

  return {
    updateMutation,
    tipo_modificacion,

    isLoading: computed(() => updateMutation.isPending.value),
    isCreated: computed(() => updateMutation.isSuccess.value),

    modificar
  }
}

export default useModificar

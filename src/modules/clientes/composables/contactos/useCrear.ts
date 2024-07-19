import { postContacto } from '@/modules/clientes/helpers/post-contacto'
import { useClienteStore } from '@/stores/cliente'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { computed, watch } from 'vue'

const useCrear = () => {
  const toast = useToast()
  const clienteStore = useClienteStore()
  const queryClient = useQueryClient()
  const { contacto } = storeToRefs(clienteStore)

  const contactoMutation = useMutation({
    mutationKey: ['crearContacto'],
    mutationFn: postContacto,
    onMutate: () => {
      clienteStore.resetErros()
    },
    onError: (error: any) => {
      clienteStore.setErrorsContacto(error.response.data.errors)
    }
  })

  watch(contactoMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      toast.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Contacto creado',
        life: 3000
      })

      queryClient.invalidateQueries({
        queryKey: ['contactos', contacto.value.cliente_id]
      })
    }
  })

  return {
    contactoMutation,

    isLoading: computed(() => contactoMutation.isPending.value),
    isCreated: computed(() => contactoMutation.isSuccess.value)
  }
}

export default useCrear

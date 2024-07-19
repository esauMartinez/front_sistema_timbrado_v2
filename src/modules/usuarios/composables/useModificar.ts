import { useUsuarioStore } from '@/stores/usuario'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast'
import { updateUsuario } from '@/modules/usuarios/helpers/update-usuario'
import { computed, watch } from 'vue'

export const useModificar = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const usuarioStore = useUsuarioStore()

  const updateMutation = useMutation({
    mutationFn: updateUsuario,
    onMutate: () => {
      usuarioStore.resetErrors()
    },
    onError: (error: any) => {
      usuarioStore.setErrors(error.response.data.errors)
    }
  })

  watch(updateMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      toast.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: updateMutation.data.value!.data,
        life: 3000
      })

      queryClient.invalidateQueries({
        queryKey: ['usuarios']
      })
    }
  })

  watch(updateMutation.isError, (isError) => {
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
    isPending: computed(() => updateMutation.isPending.value),
    isSuccess: computed(() => updateMutation.isSuccess.value),

    updateMutation
  }
}

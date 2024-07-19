import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { updateOperador } from '@/modules/operadores/helpers/update-operador'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useOperadorStore } from '@/stores/operador'

export const useModificar = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const operadorStore = useOperadorStore()

  const updateMutation = useMutation({
    mutationFn: updateOperador,
    onMutate: () => {
      operadorStore.resetErrors()
    },
    onError: (error: any) => {
      operadorStore.setErrors(error.response.data.errors)
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
        queryKey: ['operadores']
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

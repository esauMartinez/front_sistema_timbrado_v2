import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { postOperador } from '@/modules/operadores/helpers/post-operador'
import { computed, watch } from 'vue'
import { useOperadorStore } from '@/stores/operador'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'

export const useCrear = () => {
  const queryClient = useQueryClient()
  const operadorStore = useOperadorStore()
  const { operador, gafete } = storeToRefs(operadorStore)
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: postOperador,
    onMutate: () => {
      operadorStore.resetErrors()
    },
    onError: (error: any) => {
      operadorStore.setErrors(error.response.data.errors)
    }
  })

  watch(crearMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['operadores']
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
    operador,
    gafete,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}

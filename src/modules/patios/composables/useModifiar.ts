import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { usePatioStore } from '@/stores/patio'
import { updatePatio } from '../helpers/update-patio'

export const useModificar = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const patioStore = usePatioStore()

  const updateMutation = useMutation({
    mutationFn: updatePatio,
    onMutate: () => {
      patioStore.resetErrors()
    },
    onError: (error: any) => {
      patioStore.setErrors(error.response.data.errors)
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
        queryKey: ['patios']
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

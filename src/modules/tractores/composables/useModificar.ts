import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { updateTractor } from '../helpers/update-tractor'
import { useTractorStore } from '@/stores/tractor'
import type { Tractor } from '../interfaces/tractor'

export const useModificar = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const tractorStore = useTractorStore()

  const updateMutation = useMutation({
    mutationFn: updateTractor,
    onMutate: () => {
      tractorStore.resetErrors()
    },
    onError: (error: any) => {
      tractorStore.setErrors(error.response.data.errors)
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
        queryKey: ['tractores']
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

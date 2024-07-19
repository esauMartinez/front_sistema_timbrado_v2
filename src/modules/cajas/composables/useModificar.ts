import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { updateCaja } from '@/modules/cajas/helpers/update-caja'
import { useCajaStore } from '@/stores/caja'

export const useModificar = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const cajaStore = useCajaStore()

  const updateMutation = useMutation({
    mutationFn: updateCaja,
    onMutate: () => {
      cajaStore.resetErrors()
    },
    onError: (error: any) => {
      cajaStore.setErrors(error.response.data.errors)
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
        queryKey: ['cajas']
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

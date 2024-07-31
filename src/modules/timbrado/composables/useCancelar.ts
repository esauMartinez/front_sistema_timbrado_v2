import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast'
import { computed, watch } from 'vue'
import { cancelarTimbre } from '@/modules/timbrado/helpers/cancelar-timbre'
import { useTimbradoStore } from '@/stores/timbrado'
import { storeToRefs } from 'pinia'

export const useCancelar = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const timbradoStore = useTimbradoStore()
  const { cancelacion } = storeToRefs(timbradoStore)

  const cancelarTimbreMutation = useMutation({
    mutationFn: cancelarTimbre,
    onMutate: () => {
      timbradoStore.resetErrors()
    },
    onError: (error: any) => {
      timbradoStore.setErrors(error.response.data.errors)
    }
  })

  watch(cancelarTimbreMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      toast.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: cancelarTimbreMutation.data.value!.data,
        life: 3000
      })

      queryClient.invalidateQueries({
        queryKey: ['patios']
      })
    }
  })

  watch(cancelarTimbreMutation.isError, (isError) => {
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
    cancelacion,
    
    isPending: computed(() => cancelarTimbreMutation.isPending.value),
    isSuccess: computed(() => cancelarTimbreMutation.isSuccess.value),

    cancelarTimbreMutation
  }
}

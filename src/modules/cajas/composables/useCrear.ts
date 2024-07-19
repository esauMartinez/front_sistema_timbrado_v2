import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import { postCaja } from '@/modules/cajas/helpers/post-caja'
import { useCajaStore } from '@/stores/caja'

export const useCrear = () => {
  const queryClient = useQueryClient()
  const cajaStore = useCajaStore()
  const { caja } = storeToRefs(cajaStore)
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: postCaja,
    onMutate: () => {
      cajaStore.resetErrors()
    },
    onError: (error: any) => {
      cajaStore.setErrors(error.response.data.errors)
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
        queryKey: ['cajas']
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
    caja,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}

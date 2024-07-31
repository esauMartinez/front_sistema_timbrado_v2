import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import { usePatioStore } from '@/stores/patio'
import { createMarca } from '@/modules/marcas/helpers/post-marca'

export const useCrear = () => {
  const queryClient = useQueryClient()
  const patioStore = usePatioStore()
  const { patio } = storeToRefs(patioStore)
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: createMarca,
    onMutate: () => {
      patioStore.resetErrors()
    },
    onError: (error: any) => {
      patioStore.setErrors(error.response.data.errors)
    }
  })

  watch(crearMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['patios']
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
    patio,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}

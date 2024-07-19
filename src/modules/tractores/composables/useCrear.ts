import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import { useTractorStore } from '@/stores/tractor'
import { postTractor } from '../helpers/post-tractor'

export const useCrear = () => {
  const queryClient = useQueryClient()
  const tractorStore = useTractorStore()
  const { tractor } = storeToRefs(tractorStore)
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: postTractor,
    onMutate: () => {
      tractorStore.resetErrors()
    },
    onError: (error: any) => {
      tractorStore.setErrors(error.response.data.errors)
    }
  })

  watch(crearMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['tractores']
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
    tractor,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}

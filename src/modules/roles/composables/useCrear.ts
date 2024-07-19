import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import { postRol } from '@/modules/roles/helpers/post-rol'
import { useRolStore } from '@/stores/rol'

export const useCrear = () => {
  const queryClient = useQueryClient()
  const rolStore = useRolStore()
  const { rol } = storeToRefs(rolStore)
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: postRol,
    onMutate: () => {
      rolStore.resetErrors()
    },
    onError: (error: any) => {
      rolStore.setErrors(error.response.data.errors)
    }
  })

  watch(crearMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['roles']
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
    rol,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}

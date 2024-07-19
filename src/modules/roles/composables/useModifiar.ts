import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRolStore } from '@/stores/rol'
import { updateRol } from '@/modules/roles/helpers/update-rol'
import { storeToRefs } from 'pinia'

export const useModificar = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const rolStore = useRolStore()
  const { modulos } = storeToRefs(rolStore)

  const updateMutation = useMutation({
    mutationFn: updateRol,
    onMutate: () => {
      rolStore.resetErrors()
    },
    onError: (error: any) => {
      rolStore.setErrors(error.response.data.errors)
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
        queryKey: ['roles']
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
    modulos,
    
    isPending: computed(() => updateMutation.isPending.value),
    isSuccess: computed(() => updateMutation.isSuccess.value),

    updateMutation
  }
}

import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import { createMarca } from '@/modules/marcas/helpers/post-marca'
import { useMarcaStore } from '@/stores/marca'

export const useCrear = () => {
  const queryClient = useQueryClient()
  const marcaStore = useMarcaStore()
  const { marca } = storeToRefs(marcaStore)
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: createMarca,
    onMutate: () => {
      marcaStore.resetErrors()
    },
    onError: (error: any) => {
      marcaStore.setErrors(error.response.data.errors)
    }
  })

  watch(crearMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['marcas']
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
    marca,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}

import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { postServicio } from '@/modules/servicios/helpers/post-servicio'
import { useServicioStore } from '@/stores/servicio'
import { computed, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'

export const useCrear = () => {
  const servicioStore = useServicioStore()
  const { servicio } = storeToRefs(servicioStore)
  const queryClient = useQueryClient()
  const toast = useToast()

  const crearMutation = useMutation({
    mutationFn: postServicio,
    onMutate: () => {
      servicioStore.resetErrors()
    },
    onError: (error: any) => {
      servicioStore.setErrors(error.response.data.errors)
    }
  })

  watch(crearMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['servicios']
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
    servicio,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}

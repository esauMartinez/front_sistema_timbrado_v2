import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useTripStore } from '@/stores/trip'
import { createComentario } from '@/modules/trips/helpers/comentarios/create-comentario'
import { useToast } from 'primevue/usetoast'

export const useCrear = () => {
  const tripStore = useTripStore()
  const { trip } = storeToRefs(tripStore)
  const queryClient = useQueryClient()
  const toast = useToast()

  const { comentario } = storeToRefs(tripStore)

  const crearMutation = useMutation({
    mutationFn: createComentario
  })

  watch(crearMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['comentariosTrip', trip.value.id]
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
    comentario,

    isPending: computed(() => crearMutation.isPending.value),
    isSuccess: computed(() => crearMutation.isSuccess.value),

    crearMutation
  }
}

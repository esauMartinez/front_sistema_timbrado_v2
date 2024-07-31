import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'primevue/usetoast'
import { computed, watch } from 'vue'
import { useTimbradoStore } from '@/stores/timbrado'
import { storeToRefs } from 'pinia'
import { createRegimenAduanero } from '@/modules/trips/helpers/regimen/create-regimen'
import { useTripStore } from '@/stores/trip'

export const useCrear = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const timbradoStore = useTimbradoStore()
  const tripStore = useTripStore()
  const { trip } = storeToRefs(tripStore)
  const { regimen, errorRegimen } = storeToRefs(timbradoStore)

  const createRegimen = useMutation({
    mutationKey: ['updateregimne'],
    mutationFn: createRegimenAduanero,
    onMutate: () => {
      timbradoStore.resetErrorRegimen()
    },
    onError: (error: any) => {
      timbradoStore.setErrorRegimen(error.response.data.errors)
    }
  })

  watch(createRegimen.isSuccess, (isSuccess) => {
    if (isSuccess) {
      toast.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: createRegimen.data.value!.data,
        life: 3000
      })

      queryClient.invalidateQueries({
        queryKey: ['trip', trip.value.id]
      })
    }
  })

  watch(createRegimen.isError, (isError) => {
    if (isError) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error en regimen',
        life: 3000
      })
    }
  })

  return {
    regimen,
    errorRegimen,

    isPending: computed(() => createRegimen.isPending.value),
    isSuccess: computed(() => createRegimen.isSuccess.value),

    createRegimen
  }
}

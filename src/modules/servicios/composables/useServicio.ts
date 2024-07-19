import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { getServicio } from '@/modules/servicios/helpers/get-servicio'
import { computed, watch } from 'vue'
import { useServicioStore } from '@/stores/servicio'

export const useServicio = (id: number) => {
  const serviciosStore = useServicioStore()
  const { servicio } = storeToRefs(serviciosStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['servicio', id],
    queryFn: () => getServicio(id)
  })

  watch(
    data,
    (payload) => {
      if (payload) serviciosStore.setServicio({ ...payload })
    },
    { immediate: true }
  )

  return {
    servicio,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

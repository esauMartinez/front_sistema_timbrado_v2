import { useServicioStore } from '@/stores/servicio'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { getServicios } from '@/modules/servicios/helpers/get-servicios'
import { computed, watch } from 'vue'

export const useServicios = () => {
  const servicioStore = useServicioStore()
  const { servicios } = storeToRefs(servicioStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['servicios'],
    queryFn: getServicios
  })

  watch(
    data,
    (payload) => {
      if (payload) servicioStore.setServicios(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    servicios,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

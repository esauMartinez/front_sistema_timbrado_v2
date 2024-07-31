import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'
import { usePatioStore } from '@/stores/patio'
import { getPatiosPorNombre } from '@/modules/patios/helpers/get-by-nombre'

const usePatiosByName = () => {
  const patioStore = usePatioStore()
  const { patio, patios } = storeToRefs(patioStore)

  const {
    data,
    isLoading,
    refetch: refetchPatios
  } = useQuery({
    queryKey: ['patiosByName', patio.value.nombre],
    queryFn: () => getPatiosPorNombre(patio.value.nombre),
    enabled: false
  })

  watch(data, (payload) => {
    if (payload) {
      console.log(payload);
      patioStore.setPatios(payload.map((x) => ({ ...x })))
    }
  }, {
    immediate: true
  })

  return {
    patio,
    patios,

    isLoading: isLoading,

    refetchPatios
  }
}

export default usePatiosByName

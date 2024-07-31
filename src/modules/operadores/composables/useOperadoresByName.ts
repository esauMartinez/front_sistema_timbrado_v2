import { storeToRefs } from 'pinia'
import { useOperadorStore } from '@/stores/operador'
import { getOperadoresPorNombre } from '@/modules/operadores/helpers/get-by-nombre'
import { useQuery } from '@tanstack/vue-query'
import { computed, watch } from 'vue'

const useOperadoresByName = () => {
  const operadorStore = useOperadorStore()
  const { operador, operadores } = storeToRefs(operadorStore)

  const {
    data,
    isLoading,
    isSuccess,
    refetch: refetchOperadores
  } = useQuery({
    queryKey: ['operadoresByName', operador.value.nombre],
    queryFn: () => getOperadoresPorNombre(operador.value.nombre),
    enabled: false
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        operadorStore.setOperadores(payload.map((x) => ({ ...x })))
      }
    },
    { immediate: true }
  )

  return {
    operador,
    operadores,
    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value),
    refetchOperadores
  }
}

export default useOperadoresByName

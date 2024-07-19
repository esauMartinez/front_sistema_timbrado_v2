import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useOperadorStore } from '@/stores/operador'
import { getOperadoresPorNombre } from '@/modules/operadores/helpers/get-by-nombre'

const useOperadoresByName = () => {
  const operadorStore = useOperadorStore()
  const { operador, operadores } = storeToRefs(operadorStore)

  const {
    data,
    isLoading,
    refetch: refetchOperadores
  } = useQuery({
    queryKey: ['operadoresByName', operador.value.nombre],
    queryFn: () => getOperadoresPorNombre(operador.value.nombre)
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

    isLoading: isLoading,

    refetchOperadores
  }
}

export default useOperadoresByName

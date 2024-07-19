import { useOperadorStore } from '@/stores/operador'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { getOperador } from '@/modules/operadores/helpers/get-operador'
import { computed, watch } from 'vue'

export const useOperador = (id: number) => {
  const operadorStore = useOperadorStore()
  const { operador, gafete } = storeToRefs(operadorStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['operador', id],
    queryFn: () => getOperador(id)
  })

  watch(
    data,
    (payload) => {
      if (payload) operadorStore.setOperador({ ...payload })
    },
    { immediate: true }
  )

  return {
    operador,
    gafete,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

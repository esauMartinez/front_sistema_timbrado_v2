import { useOperadorStore } from '@/stores/operador'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { getOperadores } from '@/modules/operadores/helpers/get-operadores'
import { computed, watch } from 'vue'

export const useOperadores = () => {
  const operadorStore = useOperadorStore()

  const { operadores } = storeToRefs(operadorStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['operadores'],
    queryFn: getOperadores
  })

  watch(
    data,
    (payload) => {
      if (payload) operadorStore.setOperadores(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    operadores,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

// import { useQuery } from '@tanstack/vue-query'
// import { computed, watch } from 'vue'
import { usePatioStore } from '@/stores/patio'
import { getCodigos } from '../helpers/get-codigos'

export const useCodigos = () => {
  const patioStore = usePatioStore()

  // const { isLoading, isSuccess, data } = useQuery({
  //   queryKey: ['codigos', codigo],
  //   queryFn: () => getCodigos(codigo)
  // })

  // watch(
  //   data,
  //   (payload) => {
  //     if (payload) patioStore.setCodigos(payload.map((x) => ({ ...x })))
  //   },
  //   { immediate: true }
  // )

  const getCurrentCodigos = async (codigo: string) => {
    patioStore.setCodigos(await getCodigos(codigo))
  }

  return {
    // isLoading: computed(() => isLoading.value),
    // isSuccess: computed(() => isSuccess.value),
    getCurrentCodigos
  }
}

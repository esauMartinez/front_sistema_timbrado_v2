import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useMarcaStore } from '@/stores/marca'
import { getMarcas } from '@/modules/marcas/helpers/get-marcas'

export const useMarcas = (tipo: string) => {
  const marcaStore = useMarcaStore()

  const { marcas } = storeToRefs(marcaStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['marcas', tipo],
    queryFn: () => getMarcas(tipo)
  })

  watch(
    data,
    (payload) => {
      if (payload) marcaStore.setMarcas(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    marcas,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useTractorStore } from '@/stores/tractor'
import { getTractoresPorNumeroEconomico } from '@/modules/tractores/helpers/get-by-economico'

const useTractoresByNumeroEconomico = () => {
  const tractorStore = useTractorStore()
  const { tractor, tractores } = storeToRefs(tractorStore)

  const {
    data,
    isLoading,
    refetch: refetchTractores
  } = useQuery({
    queryKey: ['tractoresByNumeroEconomico', tractor.value.numero_economico],
    queryFn: () => getTractoresPorNumeroEconomico(tractor.value.numero_economico)
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        tractorStore.setTractores(payload.map((x) => ({ ...x })))
      }
    },
    { immediate: true }
  )

  return {
    tractor,
    tractores,

    isLoading: isLoading,

    refetchTractores
  }
}

export default useTractoresByNumeroEconomico

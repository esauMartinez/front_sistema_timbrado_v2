import { storeToRefs } from 'pinia'
import { useTractorStore } from '@/stores/tractor'
import { getTractoresPorNumeroEconomico } from '@/modules/tractores/helpers/get-by-economico'
import { useQuery } from '@tanstack/vue-query'
import { computed, watch } from 'vue'

const useTractoresByNumeroEconomico = () => {
  const tractorStore = useTractorStore()
  const { tractor, tractores } = storeToRefs(tractorStore)

  const {
    data,
    isLoading,
    isSuccess,
    refetch: refetchTractores
  } = useQuery({
    queryKey: ['tractoresByNumeroEconomico', tractor.value.numero_economico],
    queryFn: () => getTractoresPorNumeroEconomico(tractor.value.numero_economico),
    enabled: false
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
    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value),
    refetchTractores
  }
}

export default useTractoresByNumeroEconomico

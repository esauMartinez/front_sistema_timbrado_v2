import { storeToRefs } from 'pinia'
import { useCajaStore } from '@/stores/caja'
import { getCajasPorNumeroEconomico } from '@/modules/cajas/helpers/get-by-economico'
import { useQuery } from '@tanstack/vue-query'
import { computed, watch } from 'vue'

const useCajasByNumeroEconomico = () => {
  const cajaStore = useCajaStore()
  const { caja, cajas } = storeToRefs(cajaStore)

  const {
    data,
    isLoading,
    isSuccess,
    refetch: refetchCajas
  } = useQuery({
    queryKey: ['cajasByNumeroEconomico', caja.value.numero_economico],
    queryFn: () => getCajasPorNumeroEconomico(caja.value.numero_economico),
    enabled: false
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        cajaStore.setCajas(payload.map((x) => ({ ...x })))
      }
    },
    { immediate: true }
  )

  return {
    caja,
    cajas,
    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value),
    refetchCajas
  }
}

export default useCajasByNumeroEconomico

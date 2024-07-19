import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useCajaStore } from '@/stores/caja'
import { getCajasPorNumeroEconomico } from '@/modules/cajas/helpers/get-by-economico'

const useCajasByNumeroEconomico = () => {
  const cajaStore = useCajaStore()
  const { caja, cajas } = storeToRefs(cajaStore)

  const {
    data,
    isLoading,
    refetch: refetchCajas
  } = useQuery({
    queryKey: ['cajasByNumeroEconomico', caja.value.numero_economico],
    queryFn: () => getCajasPorNumeroEconomico(caja.value.numero_economico)
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

    isLoading: isLoading,

    refetchCajas
  }
}

export default useCajasByNumeroEconomico

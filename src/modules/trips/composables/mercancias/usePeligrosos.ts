import { useTimbradoStore } from '@/stores/timbrado'
import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import { useTripStore } from '@/stores/trip'
import { computed, watch } from 'vue'
import { getPeligrosos } from '@/modules/trips/helpers/mercancias/get-peligrosos-sat'

export const usePeligrosos = () => {
  const timbradoStore = useTimbradoStore()
  const tripStore = useTripStore()
  const { mercancia } = storeToRefs(tripStore)

  const { materialesPeligrososSat } = storeToRefs(timbradoStore)

  const {
    data,
    isLoading,
    refetch: refetchPeligrosos
  } = useQuery({
    queryKey: ['clientesByName', mercancia.value.clave_material_peligroso],
    queryFn: () => getPeligrosos(mercancia.value.clave_material_peligroso),
    enabled: false
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        timbradoStore.setMaterialesPeligrosos(payload.map((x) => ({ ...x })))
      }
    },
    { immediate: true }
  )

  return {
    materialesPeligrososSat,
    isLoading: computed(() => isLoading.value),

    refetchPeligrosos
  }
}

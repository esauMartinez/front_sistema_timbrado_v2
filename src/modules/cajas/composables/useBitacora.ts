import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useCajaStore } from '@/stores/caja'
import { getBitacora } from '@/modules/cajas/helpers/get-bitacora'

export const useBitacora = (numero_economico: string) => {
  const cajaStore = useCajaStore()
  const { bitacora } = storeToRefs(cajaStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['bitacora_caja', numero_economico],
    queryFn: () => getBitacora(numero_economico)
  })

  watch(
    data,
    (payload) => {
      if (payload) cajaStore.setBitacora(payload)
    },
    { immediate: true }
  )

  return {
    bitacora,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

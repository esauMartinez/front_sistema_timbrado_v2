import { useTimbradoStore } from '@/stores/timbrado'
import { storeToRefs } from 'pinia'
import { getTipoCambio } from '@/modules/timbrado/helpers/get-tipo-cambio'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'

const useTipoCambio = () => {
  const timbradoStore = useTimbradoStore()
  const { tipo_cambio } = storeToRefs(timbradoStore)

  const timbresQuery = useQuery({
    queryKey: ['tipo_cambio'],
    queryFn: getTipoCambio
  })

  watch(
    timbresQuery.data,
    (payload) => {
      if (payload) timbradoStore.setTipoCambio(payload)
    },
    { immediate: true }
  )

  return {
    tipo_cambio,

    isLoading: timbresQuery.isLoading
  }
}

export default useTipoCambio

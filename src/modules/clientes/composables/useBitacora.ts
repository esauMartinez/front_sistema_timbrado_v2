import { useQuery } from '@tanstack/vue-query'
import { getBitacora } from '@/modules/clientes/helpers/get-bitacora'
import { watch } from 'vue'
import { useClienteStore } from '@/stores/cliente'
import { storeToRefs } from 'pinia'

const useBitacora = (id: number) => {
  const clienteStore = useClienteStore()

  const { bitacora } = storeToRefs(clienteStore)

  const { isLoading, data } = useQuery({
    queryKey: ['bitacora'],
    queryFn: () => getBitacora(id),
  })

  watch(
    data,
    (payload) => {
      if (payload) clienteStore.setBitacora(payload)
    },
    { immediate: true }
  )

  return {
    isLoading,
    bitacora
  }
}

export default useBitacora

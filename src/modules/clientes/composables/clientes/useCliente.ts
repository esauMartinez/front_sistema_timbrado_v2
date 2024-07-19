import { useClienteStore } from '@/stores/cliente'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { getCliente } from '@/modules/clientes/helpers/get-cliente'
import { watch } from 'vue'

const useCliente = (id: number) => {
  const clienteStore = useClienteStore()
  const { cliente } = storeToRefs(clienteStore)

  const { isLoading, data } = useQuery({
    queryKey: ['cliente', id],
    queryFn: () => getCliente(id),
  })

  watch(
    data,
    (payload) => {
      if (payload) clienteStore.setCliente({ ...payload })
    },
    { immediate: true }
  )

  return {
    isLoading,
    cliente
  }
}

export default useCliente

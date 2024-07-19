import { storeToRefs } from 'pinia'
import { getClientes } from '@/modules/clientes/helpers/get-clientes'
import { useClienteStore } from '@/stores/cliente'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'

const useClientes = () => {
  const clienteStore = useClienteStore()
  const { clientes } = storeToRefs(clienteStore)

  const clientesQuery = useQuery({
    queryKey: ['clientes'],
    queryFn: () => getClientes()
  })

  watch(
    clientesQuery.data,
    (payload) => {
      if (payload) clienteStore.setClientes(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    clientes,

    isLoading: clientesQuery.isLoading
  }
}

export default useClientes

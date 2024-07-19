import { storeToRefs } from 'pinia'
import { getClientesPorNombre } from '@/modules/clientes/helpers/get-by-nombre'
import { useClienteStore } from '@/stores/cliente'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'

const useClientesByName = () => {
  const clienteStore = useClienteStore()
  const { cliente, clientes } = storeToRefs(clienteStore)

  const {
    data,
    isLoading,
    refetch: refetchClientes
  } = useQuery({
    queryKey: ['clientesByName', cliente.value.razon_social],
    queryFn: () => getClientesPorNombre(cliente.value.razon_social)
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        clienteStore.setClientes(payload.map((x) => ({ ...x })))
      }
    },
    { immediate: true }
  )

  return {
    cliente,
    clientes,

    isLoading: isLoading,

    refetchClientes
  }
}

export default useClientesByName

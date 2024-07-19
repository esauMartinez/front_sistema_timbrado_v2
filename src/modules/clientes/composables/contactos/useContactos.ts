import { useQuery } from '@tanstack/vue-query'
import { getContactos } from '@/modules/clientes/helpers/get-contactos'
import { watch } from 'vue'
import { useClienteStore } from '@/stores/cliente'
import { storeToRefs } from 'pinia'

const useContactos = (id: number) => {
  const clienteStore = useClienteStore()

  const { contactos } = storeToRefs(clienteStore)

  const { isLoading, data } = useQuery({
    queryKey: ['contactos', id],
    queryFn: () => getContactos(id)
  })

  watch(
    data,
    (payload) => {
      if (payload) clienteStore.setContactos(payload)
    },
    { immediate: true }
  )

  return {
    isLoading,
    contactos
  }
}

export default useContactos

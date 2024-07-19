import { useClienteStore } from '@/stores/cliente'
import { storeToRefs } from 'pinia'

const useContacto = () => {
  const contactoStore = useClienteStore()

  const { contacto } = storeToRefs(contactoStore)

  return { contacto }
}

export default useContacto

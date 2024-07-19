import { useUsuarioStore } from '@/stores/usuario'
import { computed, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { getUsuarios } from '@/modules/usuarios/helpers/get-usuarios'

export const useUsuarios = () => {
  const usuariosStore = useUsuarioStore()
  const { usuarios } = storeToRefs(usuariosStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['usuarios'],
    queryFn: getUsuarios
  })

  watch(
    data,
    (payload) => {
      if (payload) usuariosStore.setUsuarios(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    usuarios,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

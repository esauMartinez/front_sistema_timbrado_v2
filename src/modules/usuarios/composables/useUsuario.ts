import { useUsuarioStore } from '@/stores/usuario'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { getUsuario } from '@/modules/usuarios/helpers/get-usuario'
import { computed, watch } from 'vue'

export const useUsuario = (id: number) => {
  const usuarioStore = useUsuarioStore()
  const { usuario } = storeToRefs(usuarioStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['usuario', id],
    queryFn: () => getUsuario(id)
  })

  watch(
    data,
    (payload) => {
      if (payload) usuarioStore.setUsuario({ ...payload })
    },
    { immediate: true }
  )

  return {
    usuario,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

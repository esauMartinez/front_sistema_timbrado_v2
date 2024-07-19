import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useRolStore } from '@/stores/rol'
import { getRol } from '@/modules/roles/helpers/get-rol'
import type { Rol } from '../interfaces/rol'

export const useRol = (id: number) => {
  const rolStore = useRolStore()
  const { rol, modulos } = storeToRefs(rolStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['rol', id],
    queryFn: () => getRol(id)
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        payload.permisos.forEach((x) => {
          modulos.value.forEach((y) => {
            y.permisos.forEach((z) => {
              if (z.id === x.id) {
                z.seleccionado = true
              }
            })
          })
        })
        rolStore.setRol(payload)
      }
    },
    { immediate: true }
  )

  return {
    rol,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

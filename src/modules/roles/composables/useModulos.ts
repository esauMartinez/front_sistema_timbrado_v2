import { useRolStore } from '@/stores/rol'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { getModulos } from '@/modules/roles/helpers/get-modulos'
import { computed, watch } from 'vue'
import type { Modulo } from '../interfaces/modulo'

export const useModulos = () => {
  const rolStore = useRolStore()

  const { modulos } = storeToRefs(rolStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['modulos'],
    queryFn: getModulos
  })

  watch(
    data,
    (payload) => {
      if (payload) {
        const newArray: Modulo[] = []
        payload.forEach((x) => {
          const obj = {
            id: 0,
            nombre: x.nombre,
            descripcion: x.descripcion,
            permisos: x.permisos.map((x) => ({ ...x }))
          }
          newArray.push(obj)
        })
        rolStore.setModulos(newArray)
      }
    },
    { immediate: true }
  )

  return {
    modulos,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

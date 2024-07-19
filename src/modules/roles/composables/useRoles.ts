import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useRolStore } from '@/stores/rol'
import { getRoles } from '@/modules/roles/helpers/get-roles'

export const useRoles = () => {
  const rolStore = useRolStore()

  const { roles } = storeToRefs(rolStore)

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles
  })

  watch(
    data,
    (payload) => {
      if (payload) rolStore.setRoles(payload.map((x) => ({ ...x })))
    },
    { immediate: true }
  )

  return {
    roles,

    isLoading: computed(() => isLoading.value),
    isSuccess: computed(() => isSuccess.value)
  }
}

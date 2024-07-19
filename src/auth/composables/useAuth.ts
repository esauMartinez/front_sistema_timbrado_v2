import { useMutation } from '@tanstack/vue-query'
import { auth } from '@/auth/helpers/auth'
import { computed, watch } from 'vue'
import { useSessionStore } from '@/stores/session'
import { storeToRefs } from 'pinia'
import type { Permiso } from '../interfaces/permiso'
import { nombreUsuario } from '@/guards/nombreUsuario'
import { logotipo } from '@/guards/logotipo'

export const useAuth = () => {
  const sessionStore = useSessionStore()
  const { user, isUserAuthenticated } = storeToRefs(sessionStore)

  const authMutation = useMutation({
    mutationFn: auth,
    onMutate: () => {
      console.log('autenticando')
    },
    onError: (error: any) => {
      console.log(error)
    }
  })

  watch(authMutation.isSuccess, (isSuccess) => {
    if (isSuccess) {
      localStorage.setItem('usuario', JSON.stringify(authMutation.data.value.data))

      // sessionStore.setAuthenticated(true)

      window.location.reload()
    }
  })

  watch(authMutation.isError, (isError) => {
    if (isError) {
      sessionStore.setAuthenticated(false)
    }
  })

  const logout = (): void => {
    localStorage.removeItem('rol')
    localStorage.removeItem('usuario')
    window.location.reload()
  }

  const verificarPermiso = (permiso: string): boolean => {
    const {
      role: { permisos }
    } = JSON.parse(localStorage.getItem('usuario')!)

    const verificar_permiso = permisos.find((x: Permiso) => x.nombre === permiso)
    return verificar_permiso === undefined ? true : false
  }

  return {
    user,
    isUserAuthenticated,

    isLoading: computed(() => authMutation.isPending.value),
    isSuccess: computed(() => authMutation.isSuccess.value),
    isError: computed(() => authMutation.isError.value),

    nombreUsuario: computed(() => nombreUsuario()),
    logotipo: computed(() => logotipo()),

    authMutation,
    verificarPermiso,
    logout
  }
}

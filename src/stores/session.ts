import type { Auth } from '@/auth/interfaces/auth'
import { darkMode } from '@/guards/darkMode'
import { verifyLocalStorageUser } from '@/guards/verificarUsuarioAutenticado'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const user = ref<Auth>({
    email: 'pruebas@gmail.com',
    password: 'pruebas'
  })
  const isUserAuthenticated = ref<boolean>(false)
  const theme_sidenav = ref<string | null>('white-theme')
  const collapsedLogo = ref<boolean>(true)
  const isDarkMode = ref<boolean>(false)
  const iconTheme = ref('fa fa-moon')

  return {
    user,
    isUserAuthenticated,
    theme_sidenav,
    collapsedLogo,
    isDarkMode,
    iconTheme,

    verifyUserAuthenticated: computed(() => verifyLocalStorageUser()),

    setAuthenticated(payload: boolean) {
      isUserAuthenticated.value = payload
    },
    setDarkMode(payload: boolean) {
      theme_sidenav.value = payload ? null : 'white-theme'

      isDarkMode.value = payload

      darkMode(payload)
    }
  }
})

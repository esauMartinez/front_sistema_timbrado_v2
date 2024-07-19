import { useAuth } from '@/auth/composables/useAuth'
import { nombreEmpresa } from '@/guards/nombreEmpresa'
import { useSessionStore } from '@/stores/session'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

export const useMenu = () => {
  const sessionStore = useSessionStore()
  const { theme_sidenav, collapsedLogo, isDarkMode, iconTheme } = storeToRefs(sessionStore)
  const { verificarPermiso, logout } = useAuth()

  const menu = ref([
    {
      header: null,
      title: 'Inicio',
      href: '/home',
      icon: 'fa fa-house'
    },
    {
      title: 'Catalogos',
      icon: 'fa fa-bars',
      hidden:
        verificarPermiso('MODULO_CLIENTES_VER') &&
        verificarPermiso('MODULO_OPERADORES_VER') &&
        verificarPermiso('MODULO_TRACTORES_VER') &&
        verificarPermiso('MODULO_CAJAS_VER') &&
        verificarPermiso('MODULO_PATIOS_VER') &&
        verificarPermiso('MODULO_SERVICIOS_VER'),
      child: [
        {
          title: 'Clientes',
          href: '/clientes',
          icon: 'fa fa-briefcase',
          hidden: verificarPermiso('MODULO_CLIENTES_VER')
        },
        {
          title: 'Operadores',
          href: '/operadores',
          icon: 'fa fa-user-astronaut',
          hidden: verificarPermiso('MODULO_OPERADORES_VER')
        },
        {
          title: 'Tractores',
          href: '/tractores',
          icon: 'fa fa-truck',
          hidden: verificarPermiso('MODULO_TRACTORES_VER')
        },
        {
          title: 'Cajas',
          href: '/Cajas',
          icon: 'fa fa-trailer',
          hidden: verificarPermiso('MODULO_CAJAS_VER')
        },
        {
          title: 'Patios',
          href: '/Patios',
          icon: 'fa fa-globe',
          hidden: verificarPermiso('MODULO_PATIOS_VER')
        },
        {
          title: 'Servcicios',
          href: '/Servicios',
          icon: 'fa fa-box-open',
          hidden: verificarPermiso('MODULO_SERVICIOS_VER')
        }
      ]
    },
    {
      header: null,
      title: 'Trips',
      href: '/Trips',
      icon: 'fa fa-suitcase',
      hidden: verificarPermiso('MODULO_TRIPS_VER')
    },
    {
      header: null,
      title: 'Timbrado',
      href: '/Timbrado',
      icon: 'fa fa-bell',
      hidden: verificarPermiso('MODULO_TIMBRADO_VER')
    },
    {
      header: null,
      title: 'Usuarios',
      href: '/usuarios',
      icon: 'fa fa-users',
      hidden: verificarPermiso('MODULO_USUARIOS_VER')
    },
    {
      header: null,
      title: 'Empresas',
      href: '/super',
      icon: 'fa fa-shield-halved',
      hidden: verificarPermiso('MODULO_EMPRESAS_VER')
    },
    {
      header: null,
      title: 'Roles',
      href: '/roles',
      icon: 'fa fa-address-book',
      hidden: verificarPermiso('MODULO_ROLES_VER')
    },
    {
      header: null,
      title: 'Ajustes',
      href: '/ajustes',
      icon: 'fa fa-gear',
      hidden: verificarPermiso('MODULO_AJUSTES_VER')
    },
    {
      header: null,
      title: 'Salir',
      href: null,
      icon: 'fa fa-power-off',
      hidden: false
    }
  ])

  const onItemClick = (e: any, item: any) => {
    if (item.title === 'Salir') {
      logout()
    }
  }

  const onToggleCollapse = (collapsed: any) => {
    if (collapsed) {
      collapsedLogo.value = true
      document.body.style.paddingLeft = '65px'
    } else {
      collapsedLogo.value = false
      document.body.style.paddingLeft = '290px'
    }
  }

  return {
    menu,
    isDarkMode,
    theme_sidenav,
    collapsedLogo,
    iconTheme,

    nombreEmpresa: computed(() => nombreEmpresa()),

    onItemClick,
    onToggleCollapse
  }
}

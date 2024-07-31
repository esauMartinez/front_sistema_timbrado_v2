import { createRouter, createWebHistory } from 'vue-router'
import { operadoresRoute } from '@/modules/operadores/router'
import { clientesRoute } from '@/modules/clientes/router'
import { tractoresRoute } from '@/modules/tractores/router'
import { cajasRoute } from '@/modules/cajas/router'
import { loginRoute } from '@/auth/router'
import { useSessionStore } from '@/stores/session'
import { patiosRoute } from '@/modules/patios/router'
import { serviciosRoute } from '@/modules/servicios/router'
import { usuariosRoute } from '@/modules/usuarios/router'
import { rolesRoute } from '@/modules/roles/router'
import { tripsRoute } from '@/modules/trips/router'
import { timbradoRoute } from '@/modules/timbrado/router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...loginRoute,
      path: '/'
    },
    {
      path: '/ajustes',
      name: 'Ajustes',
      component: () => import('../views/Ajustes.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      ...clientesRoute,
      path: '/clientes'
    },
    {
      ...operadoresRoute,
      path: '/operadores'
    },

    {
      ...tractoresRoute,
      path: '/tractores'
    },
    {
      ...cajasRoute,
      path: '/cajas'
    },
    {
      ...patiosRoute,
      path: '/patios'
    },
    {
      ...serviciosRoute,
      path: '/servicios'
    },
    {
      ...usuariosRoute,
      path: '/usuarios'
    },
    {
      ...rolesRoute,
      path: '/roles'
    },
    {
      ...tripsRoute,
      path: '/trips'
    },
    {
      ...timbradoRoute,
      path: '/timbrado'
    },
    {
      path: '/super',
      name: 'Super',
      component: () => import('../views/Super.vue'),
      children: [
        {
          path: '/agregar-empresa',
          name: 'AgregarEmpresa',
          component: () => import('../components/super/AgregarEmpresa.vue')
        },
        {
          path: '/usuarios-empresa/:id',
          name: 'UsuariosEmpresa',
          component: () => import('../components/super/UsuariosEmpresa.vue'),
          children: [
            {
              path: '/agregar-usuario-super/:id',
              name: 'AgregarUsuarioSuper',
              component: () => import('../components/super/AgregarUsuario.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/cotizaciones',
      name: 'Cotizaciones',
      component: () => import('../views/Cotizacion.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/HomeView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore()
  const authenticated = sessionStore.verifyUserAuthenticated

  if (authenticated) {
    sessionStore.setAuthenticated(true)
  }

  if (!authenticated && to.name !== 'login') {
    next('/')
  } else {
    if (to.name === 'login' && authenticated) {
      next('/home')
    } else {
      next()
    }
  }
})

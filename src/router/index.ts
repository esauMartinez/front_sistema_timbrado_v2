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
      component: () => import('../views/Home.vue')
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
      // ...tripsRoute,
      path: '/trips',
      name: 'Trips',
      component: () => import('../views/Trips.vue'),
      children: [
        {
          path: '/modificar-trip/:id',
          name: 'ModificarTrip',
          component: () => import('../components/trips/Modificar.vue'),
          children: [
            {
              path: '/agregar-cliente-trip/:id',
              name: 'AgregarClienteTrip',
              component: () => import('../components/trips/datos/Cliente.vue')
            },
            {
              path: '/agregar-operador-trip/:id',
              name: 'AgregarOperadorTrip',
              component: () => import('../components/trips/datos/Operador.vue')
            },
            {
              path: '/agregar-caja-trip/:id',
              name: 'AgregarCajaTrip',
              component: () => import('../components/trips/datos/Caja.vue')
            },
            {
              path: '/agregar-tractor-trip/:id',
              name: 'AgregarTractorTrip',
              component: () => import('../components/trips/datos/Tractor.vue')
            },
            {
              path: '/agregar-movimiento/:id',
              name: 'AgregarMovimiento',
              component: () => import('../components/trips/datos/piernas/AgregarMovimiento.vue')
            },
            // {
            //   path: '/informacion-patio/:id/:type',
            //   name: 'InformacionPatio',
            //   component: () => import('../components/patios/Modificar.vue')
            // },

            {
              path: '/pdf-trip/pdf/:id',
              name: 'PDFTrip',
              component: () => import('../components/PDFTrip.vue')
            }
          ]
        },
        {
          path: '/bitacora-trip/:id',
          name: 'BitacoraTrip',
          component: () => import('../components/trips/bitacora/Bitacora.vue')
        },
        {
          path: '/comentarios-trip/:id',
          name: 'ComentariosTrip',
          component: () => import('../components/trips/comentarios/Comentarios.vue')
        }
      ]
    },
    {
      path: '/timbrado',
      name: 'Timbrado',
      component: () => import('../views/Timbrado.vue'),
      children: [
        {
          path: '/timbrar-trip/:id',
          name: 'TimbrarTrip',
          component: () => import('../components/timbrado/Modificar.vue'),
          children: [
            {
              path: '/timbre-agregar-servicio-trip/:id',
              name: 'TimbreAgregarServicio',
              component: () => import('../components/timbrado/servicios/AgregarServicio.vue')
            },
            {
              path: '/agregar-mercancia-trip/:id',
              name: 'AgregarMercanciaTrip',
              component: () => import('../components/timbrado/mercancias/Agregar.vue')
            },
            {
              path: '/pdf-timbre/pdf/:id',
              name: 'PDFTimbre',
              component: () => import('../components/PDFTimbre.vue')
            }
          ]
        },
        {
          path: '/cancelar-timbre/:trip/:id',
          name: 'CancelarTimbre',
          component: () => import('../components/timbrado/cancelacion/Cancelacion.vue')
        }
      ]
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
      component: () => import('../views/Home.vue')
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

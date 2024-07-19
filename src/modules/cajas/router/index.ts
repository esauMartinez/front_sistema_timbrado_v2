import type { RouteRecordRaw } from 'vue-router'

// const ROUTE_NAME = "cajas";

export const cajasRoute: RouteRecordRaw = {
  path: `/cajas`,
  name: `cajas`,
  redirect: { name: 'lista-cajas' },
  component: () => import(`@/modules/cajas/layout/LayoutCajas.vue`),
  children: [
    {
      path: 'lista-cajas',
      name: 'lista-cajas',
      component: () => import(`@/modules/cajas/pages/ListaCajas.vue`),
      children: [
        {
          path: 'crear-caja',
          name: 'crear-caja',
          component: () => import(`@/modules/cajas/pages/CrearCaja.vue`)
        },
        {
          path: 'modificar-caja/:id',
          name: 'modificar-caja',
          component: () => import(`@/modules/cajas/pages/ModificarCaja.vue`)
        },
        {
          path: 'bitacora-caja/:id',
          name: 'bitacora-caja',
          component: () => import(`@/modules/cajas/pages/bitacora/BitacoraCaja.vue`)
        }
      ]
    }
  ]
}

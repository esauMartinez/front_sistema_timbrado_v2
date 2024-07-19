import type { RouteRecordRaw } from 'vue-router'

// const ROUTE_NAME = "patios";

export const patiosRoute: RouteRecordRaw = {
  path: `/patios`,
  name: `patios`,
  redirect: { name: 'lista-patios' },
  component: () => import(`@/modules/patios/layout/LayoutPatios.vue`),
  children: [
    {
      path: 'lista-patios',
      name: 'lista-patios',
      component: () => import(`@/modules/patios/pages/ListaPatios.vue`),
      children: [
        {
          path: 'crear-patio',
          name: 'crear-patio',
          component: () => import(`@/modules/patios/pages/CrearPatio.vue`)
        },
        {
          path: 'modificar-patio/:id',
          name: 'modificar-patio',
          component: () => import(`@/modules/patios/pages/ModificarPatio.vue`)
        }
      ]
    }
  ]
}

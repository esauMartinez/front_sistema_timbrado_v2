import type { RouteRecordRaw } from 'vue-router'

// const ROUTE_NAME = "tractores";

export const tractoresRoute: RouteRecordRaw = {
  path: `/tractores`,
  name: `tractores`,
  redirect: { name: 'lista-tractores' },
  component: () => import(`@/modules/tractores/layout/LayoutTractores.vue`),
  children: [
    {
      path: 'lista-tractores',
      name: 'lista-tractores',
      component: () => import(`@/modules/tractores/pages/ListaTractores.vue`),
      children: [
        {
          path: 'crear-tractor',
          name: 'crear-tractor',
          component: () => import(`@/modules/tractores/pages/CrearTractor.vue`)
        },
        {
          path: 'modificar-tractor/:id',
          name: 'modificar-tractor',
          component: () => import(`@/modules/tractores/pages/ModificarTractor.vue`)
        }
      ]
    }
  ]
}

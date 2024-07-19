import type { RouteRecordRaw } from 'vue-router'

// const ROUTE_NAME = "servicios";

export const serviciosRoute: RouteRecordRaw = {
  path: `/servicios`,
  name: `servicios`,
  redirect: { name: 'lista-servicios' },
  component: () => import(`@/modules/servicios/layout/LayoutServicios.vue`),
  children: [
    {
      path: 'lista-servicios',
      name: 'lista-servicios',
      component: () => import(`@/modules/servicios/pages/ListaServicios.vue`),
      children: [
        {
          path: 'crear-servicio',
          name: 'crear-servicio',
          component: () => import(`@/modules/servicios/pages/CrearServicio.vue`)
        },
        {
          path: 'modificar-servicio/:id',
          name: 'modificar-servicio',
          component: () => import(`@/modules/servicios/pages/ModificarServicio.vue`)
        }
      ]
    }
  ]
}

import type { RouteRecordRaw } from 'vue-router'

// const ROUTE_NAME = "trips";

export const tripsRoute: RouteRecordRaw = {
  path: `/trips`,
  name: `trips`,
  redirect: { name: 'lista-trips' },
  component: () => import(`@/modules/trips/layout/LayoutTrips.vue`),
  children: [
    {
      path: 'lista-trips',
      name: 'lista-trips',
      component: () => import(`@/modules/trips/pages/ListaTrips.vue`),
      children: [
        {
          path: 'crear-trip',
          name: 'crear-trip',
          component: () => import(`@/modules/trips/pages/CrearTrip.vue`)
        },
        // {
        //   path: 'modificar-tractor/:id',
        //   name: 'modificar-tractor',
        //   component: () => import(`@/modules/tractores/pages/ModificarTractor.vue`)
        // }
      ]
    }
  ]
}

import type { RouteRecordRaw } from 'vue-router'

// const ROUTE_NAME = "trips";

export const tripsRoute: RouteRecordRaw = {
  path: `/tripsv2`,
  name: `tripsv2`,
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
        {
          path: 'modificar-trip/:id',
          name: 'modificar-trip',
          component: () => import(`@/modules/trips/pages/ModifcarTrip.vue`),
        },
        {
          path: 'bitacora-trip/:id',
          name: 'bitacora-trip',
          component: () => import(`@/modules/trips/pages/BitacoraTrip.vue`)
        },
        {
          path: 'comentarios-trip/:id',
          name: 'comentarios-trip',
          component: () => import(`@/modules/trips/pages/ComentariosTrip.vue`)
        },
        {
          path: 'pdf-trip/:id',
          name: 'pdf-trip',
          component: () => import(`@/modules/trips/pages/PdfTrip.vue`)
        }
      ]
    }
  ]
}

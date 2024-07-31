import type { RouteRecordRaw } from 'vue-router'

// const ROUTE_NAME = "timbrado";

export const timbradoRoute: RouteRecordRaw = {
  path: `/timbrado`,
  name: `timbrado`,
  redirect: { name: 'lista-trips-timbrado' },
  component: () => import(`@/modules/timbrado/layout/LayoutTimbres.vue`),
  children: [
    {
      path: 'lista-trips-timbrado',
      name: 'lista-trips-timbrado',
      component: () => import(`@/modules/timbrado/pages/ListaTrips.vue`),
      children: [
        {
          path: 'datos-timbre/:id',
          name: 'datos-timbre',
          component: () => import(`@/modules/timbrado/pages/DatosTimbre.vue`),
          children: [
            {
              path: 'crear-mercancia',
              name: 'crear-mercancia',
              component: () => import(`@/modules/timbrado/pages/CrearMercancia.vue`)
            },
            {
              path: 'crear-concepto',
              name: 'crear-concepto',
              component: () => import(`@/modules/timbrado/pages/CrearConcepto.vue`)
            }
          ]
        },
        {
          path: 'lista-timbres/:id',
          name: 'lista-timbres',
          component: () => import(`@/modules/timbrado/pages/ListaTimbres.vue`),
          children: [
            {
              path: 'cancelar-timbre/:id_cancelacion',
              name: 'cancelar-timbre',
              component: () => import(`@/modules/timbrado/pages/CancelarTimbre.vue`)
            }
          ]
        },
        {
          path: 'pdf-timbrado/:id',
          name: 'pdf-timbrado',
          component: () => import(`@/modules/timbrado/pages/PdfTrip.vue`)
        }
      ]
    }
  ]
}

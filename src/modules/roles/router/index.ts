import type { RouteRecordRaw } from 'vue-router'

// const ROUTE_NAME = "roles";

export const rolesRoute: RouteRecordRaw = {
  path: `/roles`,
  name: `roles`,
  redirect: { name: 'lista-roles' },
  component: () => import(`@/modules/roles/layout/LayoutPatios.vue`),
  children: [
    {
      path: 'lista-roles',
      name: 'lista-roles',
      component: () => import(`@/modules/roles/pages/ListaRoles.vue`),
      children: [
        {
          path: 'crear-rol',
          name: 'crear-rol',
          component: () => import(`@/modules/roles/pages/CrearRol.vue`)
        },
        {
          path: 'modificar-rol/:id',
          name: 'modificar-rol',
          component: () => import(`@/modules/roles/pages/ModificarRol.vue`)
        }
      ]
    }
  ]
}

import type { RouteRecordRaw } from 'vue-router'

// const ROUTE_NAME = "usuarios";

export const usuariosRoute: RouteRecordRaw = {
  path: `/usuarios`,
  name: `usuarios`,
  redirect: { name: 'lista-usuarios' },
  component: () => import(`@/modules/usuarios/layout/LayoutUsuarios.vue`),
  children: [
    {
      path: 'lista-usuarios',
      name: 'lista-usuarios',
      component: () => import(`@/modules/usuarios/pages/ListaUsuarios.vue`),
      children: [
        {
          path: 'crear-usuario',
          name: 'crear-usuario',
          component: () => import(`@/modules/usuarios/pages/CrearUsuario.vue`)
        },
        {
          path: 'modificar-usuario/:id',
          name: 'modificar-usuario',
          component: () => import(`@/modules/usuarios/pages/ModificarUsuario.vue`)
        }
      ]
    }
  ]
}

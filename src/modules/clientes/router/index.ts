import type { RouteRecordRaw } from "vue-router";

// const ROUTE_NAME = "clientes";

export const clientesRoute: RouteRecordRaw = {
  path: `/clientes`,
  name: `clientes`,
  redirect: { name: "lista-clientes" },
  component: () => import(`@/modules/clientes/layouts/LayoutClientes.vue`),
  children: [
    {
      path: "lista-clientes",
      name: "lista-clientes",
      component: () => import(`@/modules/clientes/pages/ListaClientes.vue`),
      children: [
        {
          path: "crear-cliente",
          name: "crear-cliente",
          component: () => import(`@/modules/clientes/pages/CrearCliente.vue`),
        },
        {
          path: "modificar-cliente/:id",
          name: "modificar-cliente",
          component: () => import(`@/modules/clientes/pages/ModificarCliente.vue`),
        },
        {
          path: "bitacora-cliente/:id",
          name: "bitacora-cliente",
          component: () =>
            import(`@/modules/clientes/pages/bitacora/BitacoraCliente.vue`),
        },
        {
          path: "contactos-cliente/:id",
          name: "contactos-cliente",
          component: () =>
            import(`@/modules/clientes/pages/contactos/ContactosCliente.vue`),
          children: [
            {
              path: "/crear-contacto/:id",
              name: "crear-contacto",
              component: () =>
                import(`@/modules/clientes/pages/contactos/CrearContacto.vue`),
            },
          ],
        },
      ],
    },
  ],
};

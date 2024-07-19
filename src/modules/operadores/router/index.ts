import type { RouteRecordRaw } from "vue-router";

// const ROUTE_NAME = "operadores";

export const operadoresRoute: RouteRecordRaw = {
  path: `/operadores`,
  name: `operadores`,
  redirect: { name: "lista-operadores" },
  component: () => import(`@/modules/operadores/layout/LayoutOperadores.vue`),
  children: [
    {
      path: "lista-operadores",
      name: "lista-operadores",
      component: () => import(`@/modules/operadores/pages/ListaOperadores.vue`),
      children: [
        {
          path: "crear-operador",
          name: "crear-operador",
          component: () => import(`@/modules/operadores/pages/CrearOperador.vue`),
        },
        {
          path: "modificar-operador/:id",
          name: "modificar-operador",
          component: () => import(`@/modules/operadores/pages/ModificarOperador.vue`),
        },
      ],
    },
  ],
};

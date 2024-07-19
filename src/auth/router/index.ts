import type { RouteRecordRaw } from 'vue-router'

// const ROUTE_NAME = "login";

export const loginRoute: RouteRecordRaw = {
  path: `/login`,
  name: `login`,
  component: () => import(`@/auth/pages/LoginPage.vue`)
}

import { defineStore } from "pinia";
import { Rol } from "../interfaces/rol.model";

interface RolStore {
  roles: Rol[];
  rol: Rol
}

export const useRolStore = defineStore('roles', {
  state: (): RolStore => ({
    roles: [],
    rol: {
      id: null,
      nombre: null
    }
  }),
  actions: {
    setRoles(roles: any) {
      this.roles = roles;
    }
  }
});
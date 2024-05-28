import { defineStore } from 'pinia';
import { Rol } from '../interfaces/rol.model';
import { Modulo } from '../interfaces/modulos.model';

interface RolStore {
	roles: Rol[];
	rol: Rol;
	modulos: Modulo[];
}

export const useRolStore = defineStore('roles', {
	state: (): RolStore => ({
		roles: [],
		rol: {
			id: null,
			nombre: null,
			permisos: [],
		},
		modulos: [],
	}),
	actions: {
		setRoles(roles: Rol) {
			this.roles = roles;
		},
		setRol(rol: Rol) {
			this.rol = rol;
		},
		setModulos(modulos: Modulo[]) {
			this.modulos = modulos;
		},
	},
});

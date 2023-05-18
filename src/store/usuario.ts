import { defineStore } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { Usuario } from '../interfaces/usuario.model';

interface UserStore {
	usuarios: Usuario[];
	usuario: Usuario;
	
}

export const useUsuarioStore = defineStore('users', {
	state: (): UserStore => ({
		usuarios: [],
		usuario: {
			id: null,
			nombre: null,
			paterno: null,
			materno: null,
			email: null,
			password: null,
			activo: true,
			isCliente: false,
			cliente_id: null,
			empresa_id: null,
			rol_id: null,
		},
		
	}),
	actions: {
		setUsuario(usuario: Usuario) {
			this.usuario = usuario;
		},	
		setUsuarios(usuarios: Usuario[]) {
			this.usuarios = usuarios;
		},
		
	},
});

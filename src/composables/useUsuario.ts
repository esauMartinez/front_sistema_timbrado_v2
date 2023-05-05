import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { error, question } from '../helpers/messages';
import { useUsuarioStore } from '../store/usuario';
import { useToast } from 'primevue/usetoast';
import { Usuario } from '../interfaces/usuario.model';
import { router } from '../router';

export const useUsuario = () => {
	const usuarioStore = useUsuarioStore();
	const { usuario, usuarios } = storeToRefs(usuarioStore);
	const toast = useToast();

	const getUsuarios = async () => {
		try {
			const { data } = await instance.get('/usuarios');
			usuarioStore.setUsuarios(data);
		} catch (err) {
			error(err);
		}
	};

	const getUsuario = async (id: number) => {
		try {
			const { data } = await instance.get(`/usuarios/${id}`);
			usuarioStore.setUsuario(data);
		} catch (err) {
			error(err);
		}
	};

	const postUsuario = async (payload: Usuario) => {
		try {
			const { data } = await instance.post(`/usuarios`, payload);
			toast.add({
				severity: 'success',
				summary: 'Usuario',
				detail: 'Usuario creado correctamente',
				life: 3000,
			});
			getUsuarios();
			router.go(-1);
			return data;
		} catch (err) {
			error(err);
		}
	};

	const putUsuario = async (payload: any) => {
		try {
			const { data } = await instance.put(`/usuarios/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Usuario',
				detail: 'Usuario actualizado correctamente',
				life: 3000,
			});
			getUsuarios();
			return data;
		} catch (err) {
			error(err);
		}
	};

	const deleteUsuario = async (id: number) => {
		try {
			const response = await question();
			if (response.isConfirmed) {
				await instance.delete(`/usuarios/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Usuario',
					detail: 'Usuario eliminado correctamente',
					life: 3000,
				});
				getUsuarios();
			}
		} catch (err) {
			error(err);
		}
	};

	const resetUsuarioForm = () => {
		usuarioStore.setUsuario({
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
		});
	};

	const rolFormateado = (rol: string) => {
		let nombre_rol: string = null;
		if (rol === 'USER_ADMIN') {
			nombre_rol = 'ADMINISTRADOR';
		} else if (rol === 'USER_SUPER_ADMIN') {
			nombre_rol = 'SUPER ADMINISTRADOR';
		} else if (rol === 'USER_CLIENT') {
			nombre_rol = 'CLIENTE';
		} else if (rol === 'USER_EMPLOYEE') {
			nombre_rol = 'EMPLEADO';
		}
		return nombre_rol;
	};

	return {
		usuario,
		usuarios,
		getUsuarios,
		getUsuario,
		rolFormateado,
		postUsuario,
		putUsuario,
		deleteUsuario,
		resetUsuarioForm,
	};
};

import { storeToRefs } from 'pinia';
import { instance } from '@/helpers/axiosInstance';
import { handleError, question } from '@/helpers/messages';
import { useUsuarioStore } from '@/store/usuario';
import { useToast } from 'primevue/usetoast';
import { Usuario } from '@/interfaces/usuario.model';
import { router } from '@/router';

export const useUsuario = () => {
	const usuarioStore = useUsuarioStore();
	const { usuario, usuarios } = storeToRefs(usuarioStore);
	const toast = useToast();

	const getUsuarios = async () => {
		try {
			const { data } = await instance.get('/usuarios');
			usuarioStore.setUsuarios(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getUsuario = async (id: number) => {
		try {
			const { data } = await instance.get(`/usuarios/${id}`);
			usuarioStore.setUsuario(data);
		} catch (error) {
			handleError(error);
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
		} catch (error) {
			handleError(error);
		}
	};

	const putUsuario = async (payload: any) => {
		try {
			await instance.put(`/usuarios/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Usuario',
				detail: 'Usuario actualizado correctamente',
				life: 3000,
			});
			getUsuarios();
			return true;
		} catch (error) {
			handleError(error);
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
		} catch (error) {
			handleError(error);
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

	return {
		usuario,
		usuarios,
		getUsuarios,
		getUsuario,
		postUsuario,
		putUsuario,
		deleteUsuario,
		resetUsuarioForm,
	};
};

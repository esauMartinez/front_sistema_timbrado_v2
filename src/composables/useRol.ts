import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { handleError, question } from '../helpers/messages';
import { useRolStore } from '../store/rol';
import { router } from '../router';
import { useToast } from 'primevue/usetoast';
import { Rol } from '../interfaces/rol.model';
import { Modulo, Permiso } from '../interfaces/modulos.model';
import { useLoadStore } from '../store/load';

export const useRol = () => {
	const rolStore = useRolStore();
	const { rol, roles, modulos } = storeToRefs(rolStore);
	const toast = useToast();
	const loadStore = useLoadStore();

	const getModulos = async () => {
		try {
			const { data } = await instance.get<Modulo[]>('/modulos');
			data.forEach((x) => {
				x.permisos.forEach((y: Permiso) => {
					y.seleccionado = false;
				});
			});
			rolStore.setModulos(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getRoles = async () => {
		try {
			const { data } = await instance.get('/roles');
			rolStore.setRoles(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getRol = async (id: number) => {
		try {
			const { data } = await instance.get<Rol>(`/roles/${id}`);
			data.permisos.forEach((x) => {
				modulos.value.forEach((y) => {
					y.permisos.forEach((z) => {
						if (z.id === x.id) {
							z.seleccionado = true;
						}
					});
				});
			});
			rolStore.setRol(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postRol = async () => {
		loadStore.setLoading(true);
		const obj = {
			id: rol.value.id,
			nombre: rol.value.nombre,
			permisos: modulos.value,
		};
		const { data } = await instance.post('/roles', obj);
		router.go(-1);
		getRoles();
		loadStore.setLoading(false);
		return data;
	};

	const putRol = async () => {
		loadStore.setLoading(true);
		const obj = {
			id: rol.value.id,
			nombre: rol.value.nombre,
			permisos: modulos.value,
		};
		const { data } = await instance.put(`/roles`, obj);
		router.go(-1);
		getRoles();
		loadStore.setLoading(false);
		return data;
	};

	const deleteRol = async (id: number) => {
		try {
			const response = await question();
			if (response.isConfirmed) {
				await instance.delete(`/roles/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Unidad',
					detail: 'Rol eliminado correctamente',
					life: 3000,
				});
				getRoles();
			}
		} catch (error) {
			handleError(error);
		}
	};

	const resetRolForm = () => {
		rolStore.setRol({
			id: null,
			nombre: null,
			permisos: [],
		});
	};

	return {
		rol,
		roles,
		modulos,
		getRoles,
		getRol,
		postRol,
		putRol,
		deleteRol,
		getModulos,
		resetRolForm,
	};
};

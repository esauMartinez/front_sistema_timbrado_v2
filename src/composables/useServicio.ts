import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { handleError, question } from '../helpers/messages';
import { useToast } from 'primevue/usetoast';
import { router } from '../router';
import { useServicioStore } from '../store/servicio';
import { Servicio } from '../interfaces/servicio';

export const useServicio = () => {
	const servicioStore = useServicioStore();
	const { servicio, servicios } = storeToRefs(servicioStore);
	const toast = useToast();

	const getServicios = async () => {
		try {
			const { data } = await instance.get('/servicios');
			servicioStore.setServicios(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getServicio = async (id: number) => {
		try {
			const { data } = await instance.get(`/servicios/${id}`);
			servicioStore.setServicio(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postServicio = async (payload: Servicio) => {
		try {
			const { data } = await instance.post(`/servicios`, payload);
			toast.add({
				severity: 'success',
				summary: 'Servicio',
				detail: 'Servicio creado correctamente',
				life: 3000,
			});
			getServicios();
			router.go(-1);
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	const putServicio = async (payload: any) => {
		try {
			const { data } = await instance.put(`/servicios/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Servicio',
				detail: 'Servicio actualizado correctamente',
				life: 3000,
			});
			getServicios();
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	const deleteServicio = async (id: number) => {
		try {
			const response = await question();
			if (response.isConfirmed) {
				await instance.delete(`/servicios/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Servicio',
					detail: 'Servicio eliminado correctamente',
					life: 3000,
				});
				getServicios();
			}
		} catch (error) {
			handleError(error);
		}
	};

	const resetServicioForm = () => {
		servicioStore.setServicio({
			id: null,
			clave: null,
			descripcion: null,
      estatus: true
		});
	};

	return {
		servicio,
		servicios,
		getServicio,
		getServicios,
		postServicio,
		putServicio,
		deleteServicio,
		resetServicioForm,
	};
};

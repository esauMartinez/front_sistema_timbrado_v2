import { storeToRefs } from 'pinia';
import { useUnidadStore } from '../store/unidad';
import { instance } from '../helpers/axiosInstance';
import { error, question } from '../helpers/messages';
import { Unidad } from '../interfaces/unidad.model';
import { useToast } from 'primevue/usetoast';
import { router } from '../router';

export const useCaja = () => {
	const unidadStore = useUnidadStore();
	const { unidad, unidades, marcas, configuraciones } = storeToRefs(unidadStore);
	const toast = useToast();

	const getUnidades = async () => {
		try {
			const { data } = await instance.get('/cajas');
			unidadStore.setUnidades(data);
		} catch (err) {
			error(err);
		}
	};

	const getUnidad = async (id: number) => {
		try {
			const { data } = await instance.get(`/cajas/${id}`);
			unidadStore.setUnidad(data);
		} catch (err) {
			error(err);
		}
	};

	const postUnidad = async (payload: Unidad) => {
		try {
			const { data } = await instance.post(`/cajas`, payload);
			toast.add({
				severity: 'success',
				summary: 'Unidad',
				detail: 'Unidad creada correctamente',
				life: 3000,
			});
			getUnidades();
			router.go(-1);
			return data;
		} catch (err) {
			error(err);
		}
	};

	const putUnidad = async (payload: any) => {
		try {
			const { data } = await instance.put(`/cajas/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Unidad',
				detail: 'Unidad actualizada correctamente',
				life: 3000,
			});
			getUnidades();
			return data;
		} catch (err) {
			error(err);
		}
	};

	const deleteUnidad = async (id: number) => {
		try {
			const response = await question();
			if (response.isConfirmed) {
				await instance.delete(`/cajas/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Unidad',
					detail: 'Unidad eliminada correctamente',
					life: 3000,
				});
				getUnidades();
			}
		} catch (err) {
			error(err);
		}
	};

	const getMarcas = async () => {
		try {
			const { data } = await instance.get('/marcas/CAJA');
			unidadStore.setMarcas(data);
		} catch (err) {
			error(err);
		}
	};

	const getConfiguraciones = async () => {
		try {
			const { data } = await instance.get('/configuraciones/CAJA');
			unidadStore.setConfiguracions(data);
		} catch (err) {
			error(err);
		}
	};

	const resetUnidadForm = () => {
		unidadStore.setUnidad({
			id: null,
			numero_economico: null,
			matricula: null,
			estatus: true,
			numero_serie: null,
			numero_poliza: null,
			vencimiento_poliza: null,
			modelo: null,
			aseguradora: null,
			configuracion: null,
			marca_id: null,
			clase_id: null,
		});
	};

	return {
		unidad,
		unidades,
		marcas,
		configuraciones,
		getUnidades,
		getUnidad,
		postUnidad,
		putUnidad,
		deleteUnidad,
		resetUnidadForm,
		getMarcas,
		getConfiguraciones,
	};
};

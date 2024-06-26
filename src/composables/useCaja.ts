import { storeToRefs } from 'pinia';
import { BitacoraCaja, useUnidadStore } from '@/store/unidad';
import { instance } from '@/helpers/axiosInstance';
import { handleError, question } from '@/helpers/messages';
import { Unidad } from '@/interfaces/unidad.model';
import { useToast } from 'primevue/usetoast';
import { router } from '@/router';
import moment from 'moment';

export const useCaja = () => {
	const unidadStore = useUnidadStore();
	const { unidad, unidades, marca, marcas, configuraciones, bitacora_caja } =
		storeToRefs(unidadStore);
	const toast = useToast();

	const getUnidades = async () => {
		try {
			const { data } = await instance.get('/cajas');
			unidadStore.setUnidades(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getUnidad = async (id: number) => {
		try {
			const { data } = await instance.get<Unidad>(`/cajas/${id}`);
			data.vencimiento_poliza = moment(data.vencimiento_poliza).format(
				'DD/MM/yyyy'
			);
			data.modelo = moment(data.modelo).format('yyyy');
			unidadStore.setUnidad(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postUnidad = async (payload: Unidad) => {
		try {
			const { data } = await instance.post(`/cajas`, payload);
			toast.add({
				severity: 'success',
				summary: 'Caja',
				detail: 'Caja creada correctamente',
				life: 3000,
			});
			getUnidades();
			router.go(-1);
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	const putUnidad = async (payload: any) => {
		try {
			await instance.put(`/cajas/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Caja',
				detail: 'Caja actualizada correctamente',
				life: 3000,
			});
			getUnidades();
			return true;
		} catch (error) {
			handleError(error);
			return false;
		}
	};

	const deleteUnidad = async (id: number) => {
		try {
			const response = await question();
			if (response.isConfirmed) {
				await instance.delete(`/cajas/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Caja',
					detail: 'Caja eliminada correctamente',
					life: 3000,
				});
				getUnidades();
			}
		} catch (error) {
			handleError(error);
		}
	};

	const getConfiguraciones = async () => {
		try {
			const { data } = await instance.get('/configuraciones/CAJA');
			unidadStore.setConfiguracions(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getUbicacionesCaja = async (numero_economico: string) => {
		try {
			const { data } = await instance.get<BitacoraCaja[]>(
				`/cajas/ubicaciones/${numero_economico}`
			);
			unidadStore.setBitacora(data);
		} catch (error) {
			handleError(error);
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
			peso: null,
			linea: null,
		});
	};

	return {
		unidad,
		unidades,
		marca,
		marcas,
		configuraciones,
		bitacora_caja,
		getUnidades,
		getUnidad,
		postUnidad,
		putUnidad,
		deleteUnidad,
		resetUnidadForm,
		getConfiguraciones,
		getUbicacionesCaja,
	};
};

import { storeToRefs } from 'pinia';
import { instance, instance_servicio_postal } from '../helpers/axiosInstance';
import { handleError, question } from '../helpers/messages';
import { useToast } from 'primevue/usetoast';
import { router } from '../router';
import { usePatioStore } from '../store/patio';
import { Patio } from '../interfaces/patio.model';
import axios from 'axios';

export const usePatio = () => {
	const patioStore = usePatioStore();
	const { patio, patios, codigos } = storeToRefs(patioStore);
	const toast = useToast();

	const getPatios = async () => {
		try {
			const { data } = await instance.get('/patios');
			patioStore.setPatios(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getPatio = async (id: number) => {
		try {
			const { data } = await instance.get(`/patios/${id}`);
			patioStore.setPatio(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postPatio = async (payload: Patio) => {
		try {
			const { data } = await instance.post(`/patios`, payload);
			toast.add({
				severity: 'success',
				summary: 'Patio',
				detail: 'Patio creado correctamente',
				life: 3000,
			});
			getPatios();
			router.go(-1);
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	const putPatio = async (payload: any) => {
		try {
			await instance.put(`/patios/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Patio',
				detail: 'Patio actualizado correctamente',
				life: 3000,
			});
			getPatios();
			return true;
		} catch (error) {
			handleError(error);
			return false;
		}
	};

	const deletePatio = async (id: number) => {
		try {
			const response = await question();
			if (response.isConfirmed) {
				await instance.delete(`/patios/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Patio',
					detail: 'Patio eliminado correctamente',
					life: 3000,
				});
				getPatios();
			}
		} catch (error) {
			handleError(error);
		}
	};

	const resetPatioForm = () => {
		patioStore.setPatio({
			id: null,
			nombre: null,
			codigo_postal: null,
			colonia: null,
			c_colonia: null,
			referencia: null,
			municipio: null,
			c_municipio: null,
			estado: null,
			c_estado: null,
			pais: null,
			c_pais: null,
			calle: null,
			numero_exterior: null,
			numero_interior: null,
			localidad: null,
			estatus: true,
			tipo: null,
		});

		patioStore.setCodigos([]);
	};

	const buscarCodigoPostal = async (codigo: string) => {
		try {
			if (codigo.length > 3) {
				const { data } = await instance_servicio_postal.get(
					`/service/${codigo}`
				);
				patioStore.setCodigos(data);
			}
		} catch (error) {
			handleError(error);
		}
	};

	const buscarPatiosPorNombre = async (nombre: string) => {
		try {
			if (nombre.length > 3) {
				const { data } = await instance.get(`/patios/por/nombre/${nombre}`);
				patioStore.setPatios(data);
			} else {
				patioStore.setPatios([]);
			}
		} catch (error) {
			handleError(error);
		}
	};

	return {
		patio,
		patios,
		codigos,
		getPatios,
		getPatio,
		postPatio,
		putPatio,
		deletePatio,
		resetPatioForm,
		buscarCodigoPostal,
		buscarPatiosPorNombre,
	};
};

import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { error, question } from '../helpers/messages';
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
		} catch (err) {
			error(err);
		}
	};

	const getPatio = async (id: number) => {
		try {
			const { data } = await instance.get(`/patios/${id}`);
			patioStore.setPatio(data);
		} catch (err) {
			error(err);
		}
	};

	const postPatio = async (payload: Patio) => {
		try {
			const { data } = await instance.post(`/patios`, payload);
			toast.add({
				severity: 'success',
				summary: 'Unidad',
				detail: 'Unidad creada correctamente',
				life: 3000,
			});
			getPatios();
			router.go(-1);
			return data;
		} catch (err) {
			error(err);
		}
	};

	const putPatio = async (payload: any) => {
		try {
			const { data } = await instance.put(`/patios/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Unidad',
				detail: 'Unidad actualizada correctamente',
				life: 3000,
			});
			getPatios();
			return data;
		} catch (err) {
			error(err);
		}
	};

	const deletePatio = async (id: number) => {
		try {
			const response = await question();
			if (response.isConfirmed) {
				await instance.delete(`/patios/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Unidad',
					detail: 'Unidad eliminada correctamente',
					life: 3000,
				});
				getPatios();
			}
		} catch (err) {
			error(err);
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
				const { data } = await axios.get(
					`http://localhost:3800/api/v1/postal_code/service/${codigo}`
				);
				patioStore.setCodigos(data);
			}
		} catch (err) {
			error(err);
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
	};
};

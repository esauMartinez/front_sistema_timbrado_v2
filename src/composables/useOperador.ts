import { storeToRefs } from 'pinia';
import { instance } from '@/helpers/axiosInstance';
import { handleError, question } from '@/helpers/messages';
import { useOperadorStore } from '@/store/operador';
import { useToast } from 'primevue/usetoast';
import { router } from '@/router';
import { Operador } from '@/interfaces/operador.model';
import moment from 'moment';
import { onMounted } from 'vue';

export const useOperador = () => {
	const operadorStore = useOperadorStore();
	const { operador, operadores } = storeToRefs(operadorStore);
	const toast = useToast();

	onMounted(() => {
		getOperadores();
	});

	const getOperadores = async () => {
		try {
			const { data } = await instance.get('/operadores');
			operadorStore.setOperadores(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getOperador = async (id: number) => {
		try {
			const { data } = await instance.get<Operador>(`/operadores/${id}`);
			data.fecha_nacimiento = moment(data.fecha_nacimiento).format(
				'DD/MM/YYYY'
			);
			data.fecha_ingreso = moment(data.fecha_ingreso).format('DD/MM/YYYY');
			data.vencimiento_licencia = moment(data.vencimiento_licencia).format(
				'DD/MM/YYYY'
			);
			operadorStore.setOperador(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postOperador = async (payload: Operador) => {
		try {
			const { data } = await instance.post(`/operadores`, payload);
			toast.add({
				severity: 'success',
				summary: 'Operador',
				detail: 'Operador creado correctamente',
				life: 3000,
			});
			getOperadores();
			router.go(-1);
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	const putOperador = async (payload: any) => {
		try {
			await instance.put(`/operadores/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Operador',
				detail: 'Operador actualizado correctamente',
				life: 3000,
			});
			getOperadores();
			return true;
		} catch (error) {
			handleError(error);
			return false;
		}
	};

	const deleteOperador = async (id: number) => {
		try {
			const response = await question();
			if (response.isConfirmed) {
				await instance.delete(`/operadores/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Operador',
					detail: 'Operador eliminado correctamente',
					life: 3000,
				});
				getOperadores();
			}
		} catch (error) {
			handleError(error);
		}
	};

	const resetOperadorForm = () => {
		operadorStore.setOperador({
			id: null,
			nombre: null,
			paterno: null,
			materno: null,
			fecha_nacimiento: null,
			fecha_ingreso: null,
			curp: null,
			rfc: null,
			codigo_postal: null,
			colonia: null,
			municipio: null,
			estado: null,
			pais: null,
			calle: null,
			numero_exterior: null,
			numero_interior: null,
			licencia: null,
			vencimiento_licencia: null,
			estatus: true,
		});
	};

	return {
		operador,
		operadores,
		getOperador,
		getOperadores,
		postOperador,
		putOperador,
		deleteOperador,
		resetOperadorForm,
	};
};

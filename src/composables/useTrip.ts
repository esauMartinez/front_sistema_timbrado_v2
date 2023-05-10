import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { error, question } from '../helpers/messages';
import { useToast } from 'primevue/usetoast';
import { useTripStore } from '../store/trip';
import { Trip } from '../interfaces/Trip';
import { Patio } from '../interfaces/patio.model';
import { usePatioStore } from '../store/patio';
import { Cliente } from '../interfaces/cliente.model';
import { Operador } from '../interfaces/operador.model';
import { Caja } from '../interfaces/caja.model';
import { Tractor } from '../interfaces/tractor.model';

export const useTrip = () => {
	const tripStore = useTripStore();
	const patioStore = usePatioStore();
	const {
		trip,
		trips,
		movimiento,
		movimientos,
		nombre_cliente,
		nombre_operador,
		numero_economico_caja,
		numero_economico_tractor,
	} = storeToRefs(tripStore);
	const toast = useToast();

	const getTrips = async () => {
		try {
			const { data } = await instance.get('/trips');
			tripStore.setTrips(data);
		} catch (err) {
			error(err);
		}
	};

	const getTrip = async (id: number) => {
		try {
			const { data } = await instance.get(`/trips/${id}`);
			tripStore.setTrip(data);
		} catch (err) {
			error(err);
		}
	};

	const postTrip = async (payload: Trip) => {
		console.log(trip.value);
	};

	const putTrip = async (payload: any) => {
		try {
			const { data } = await instance.put(`/trips/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: 'Trip actualizado correctamente',
				life: 3000,
			});
			getTrips();
			return data;
		} catch (err) {
			error(err);
		}
	};

	const deleteTrip = async (id: number) => {
		try {
			const response = await question();
			if (response.isConfirmed) {
				await instance.delete(`/trips/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Trip',
					detail: 'Trip eliminado correctamente',
					life: 3000,
				});
				getTrips();
			}
		} catch (err) {
			error(err);
		}
	};

	const resetTripForm = () => {
		tripStore.setTrip({
			id: null,
			estatus: null,
			observaciones_cancelacion: null,
			tipo: null,
			numero_cotizacion: null,
			moneda: null,
			tipo_viaje: null,
			numero_trip: null,
			metodo_pago: null,
			forma_pago: null,
			uso_CFDI: null,
			fecha_salida: null,
			fecha_llegada: null,
			kilometros: null,
			cliente_id: null,
			operador_id: null,
			caja_id: null,
			tractor_id: null,
			origen_id: null,
			destino_id: null,
		});
	};

	const selectCliente = (cliente: Cliente) => {
		nombre_cliente.value = cliente.razon_social;
		trip.value.cliente_id = cliente.id;
	};

	const selectOperador = (operador: Operador) => {
		nombre_operador.value = `${operador.nombre} ${operador.paterno} ${operador.materno}`;
		trip.value.operador_id = operador.id;
	};

	const selectCaja = (caja: Caja) => {
		numero_economico_caja.value = caja.numero_economico;
		trip.value.caja_id = caja.id;
	};

	const selectTractor = (tractor: Tractor) => {
		numero_economico_tractor.value = tractor.numero_economico;
		trip.value.tractor_id = tractor.id;
	};

	const selectPatio = (patio: Patio) => {
		patioStore.setPatio(patio);
		patioStore.setPatios([]);
	};

	return {
		trip,
		trips,
		nombre_cliente,
		nombre_operador,
		numero_economico_caja,
		numero_economico_tractor,
		getTrip,
		getTrips,
		postTrip,
		putTrip,
		deleteTrip,
		resetTripForm,
		selectCliente,
		selectOperador,
		selectCaja,
		selectTractor,
		selectPatio,
	};
};

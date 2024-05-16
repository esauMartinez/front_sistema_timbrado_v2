import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { handleError, question } from '../helpers/messages';
import { useToast } from 'primevue/usetoast';
import { useTripStore } from '../store/trip';
import { Patio } from '../interfaces/patio.model';
import { usePatioStore } from '../store/patio';
import { Cliente } from '../interfaces/cliente.model';
import { Operador } from '../interfaces/operador.model';
import { Caja } from '../interfaces/caja.model';
import { Tractor } from '../interfaces/tractor.model';
import { router } from '../router';
import { ref } from 'vue';
import moment from 'moment';

export const useTrip = () => {
	const tripStore = useTripStore();
	const patioStore = usePatioStore();
	const {
		trip,
		trips,
		estatusTrip,
		movimiento,
		movimientos,
		nombre_cliente,
		nombre_operador,
		numero_economico_caja,
		numero_economico_tractor,
	} = storeToRefs(tripStore);

	const toast = useToast();
	const initialDate = moment().subtract(1, 'week').format();
	const from = ref(new Date(initialDate));
	const to = ref(new Date());

	const getTrips = async (estatus: string) => {
		try {
			const formatFromDate = moment(from.value).format('YYYY-MM-DDT00:00:00');
			const formatToDate = moment(to.value).format('YYYY-MM-DDT23:59:59');
			const { data } = await instance.get(
				`/trips/${estatus}/${formatFromDate}/${formatToDate}`
			);
			tripStore.setTrips(data);
			estatusTrip.value = estatus;
		} catch (error) {
			handleError(error);
		}
	};

	const getTrip = async (id: number) => {
		try {
			const {
				data: trip,
				data: {
					empresa,
					cliente,
					operador,
					caja,
					tractor,
					movimientos,
					mercancias,
				},
			} = await instance.get(`/trips/${id}`);
			const origen = movimientos[0]?.patio;
			const destino = movimientos[movimientos.length - 1]?.patio;
			tripStore.setTrip(trip);
			tripStore.setEmpresa(empresa);
			tripStore.setPatios([origen, destino]);
			tripStore.setCliente(cliente);
			tripStore.setOperador(operador);
			tripStore.setCaja(caja);
			tripStore.setTractor(tractor);
			tripStore.setMovimientos(movimientos);
			tripStore.setMercancias(mercancias);
		} catch (error) {
			handleError(error);
		}
	};

	const postTrip = async () => {
		try {
			await instance.post(`/trips`);
			toast.removeGroup('bc');
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: 'Trip generado correctamente',
				life: 3000,
			});
			getTrips('CREADO');
		} catch (error) {
			handleError(error);
		}
	};

	const putTrip = async (payload: any) => {
		try {
			payload['movimientos'] = movimientos.value;
			const { data } = await instance.put(`/trips/${payload.id}`, payload);
			getTrips(estatusTrip.value);
			console.log('se modifico el trip');
			router.go(-1);
			return data;
		} catch (error) {
			handleError(error);
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
				getTrips(estatusTrip.value);
			}
		} catch (error) {
			handleError(error);
		}
	};

	const selectCliente = (cliente: Cliente) => {
		nombre_cliente.value = cliente.razon_social;
		trip.value.cliente_id = cliente.id;
		router.go(-1);
	};

	const selectOperador = (operador: Operador) => {
		nombre_operador.value = `${operador.nombre} ${operador.paterno} ${operador.materno}`;
		trip.value.operador_id = operador.id;
		router.go(-1);
	};

	const selectCaja = (caja: Caja) => {
		numero_economico_caja.value = caja.numero_economico;
		trip.value.caja_id = caja.id;
		router.go(-1);
	};

	const selectTractor = (tractor: Tractor) => {
		numero_economico_tractor.value = tractor.numero_economico;
		trip.value.tractor_id = tractor.id;
		router.go(-1);
	};

	const selectPatio = (patio: Patio) => {
		patioStore.setPatio(patio);
		patioStore.setPatios([]);
	};

	const getMovimientos = async (id: number) => {
		const { data } = await instance.get(`/obtener-movimientos-trip/${id}`);
		tripStore.setMovimientos(data);
	};

	const agregarMovimiento = async (patio: Patio) => {
		try {
			const movimiento = {
				patio_id: patio.id,
				trip_id: trip.value.id,
			};
			const { data } = await instance.post(
				`/guardar-movimiento-trip`,
				movimiento
			);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: data.data,
				life: 3000,
			});
			router.go(-1);
			getMovimientos(trip.value.id);
		} catch (error) {
			handleError(error);
		}
	};

	const vaciarMovimientos = async (id: number) => {
		try {
			const response = await question();
			if (response.isConfirmed) {
				const { data } = await instance.delete(
					`/eliminar-movimientos-trip/${id}`
				);
				toast.add({
					severity: 'success',
					summary: 'Usuario',
					detail: data.data,
					life: 3000,
				});
				getMovimientos(trip.value.id);
			}
		} catch (error) {
			handleError(error);
		}
	};

	const eliminarMovimiento = async (numero_movimiento: number) => {
		try {
			const { data } = await instance.delete(
				`/eliminar-movimiento-trip/${numero_movimiento}`
			);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: data.data,
				life: 3000,
			});
			getMovimientos(trip.value.id);
		} catch (error) {
			handleError(error);
		}
	};

	return {
		trip,
		trips,
		estatusTrip,
		from,
		to,
		movimiento,
		movimientos,
		nombre_cliente,
		nombre_operador,
		numero_economico_caja,
		numero_economico_tractor,
		getTrip,
		getTrips,
		postTrip,
		putTrip,
		deleteTrip,
		selectCliente,
		selectOperador,
		selectCaja,
		selectTractor,
		selectPatio,
		agregarMovimiento,
		vaciarMovimientos,
		eliminarMovimiento,
	};
};

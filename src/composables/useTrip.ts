import { storeToRefs } from 'pinia';
import { instance } from '@/helpers/axiosInstance';
import { handleError, question } from '@/helpers/messages';
import { useToast } from 'primevue/usetoast';
import { useTripStore } from '@/store/trip';
import { Patio } from '@/interfaces/patio.model';
import { usePatioStore } from '@/store/patio';
import { Cliente } from '@/interfaces/cliente.model';
import { Operador } from '@/interfaces/operador.model';
import { Caja } from '@/interfaces/caja.model';
import { Tractor } from '@/interfaces/tractor.model';
import { router } from '@/router';
import { ref } from 'vue';
import moment from 'moment';
import { useLoadStore } from '@/store/load';
import { Comentario, Trip } from '@/interfaces/trip';

export const useTrip = () => {
	const tripStore = useTripStore();
	const patioStore = usePatioStore();
	const loadStore = useLoadStore();
	const {
		trip,
		trips,
		estatusTrip,
		movimiento,
		movimientos,
		comentario,
		comentarios,
		nombre_cliente,
		nombre_operador,
		numero_economico_caja,
		numero_economico_tractor,
		timbre,
	} = storeToRefs(tripStore);

	const toast = useToast();
	const initialDate = moment().subtract(2, 'month').format();
	const from = ref(new Date(initialDate));
	const to = ref(new Date());

	const getTrips = async (estatus: string) => {
		try {
			loadStore.setLoading(true);
			const formatFromDate = moment(from.value).format('YYYY-MM-DDT00:00:00');
			const formatToDate = moment(to.value).format('YYYY-MM-DDT23:59:59');
			const { data } = await instance.get(
				`/trips/${estatus}/${formatFromDate}/${formatToDate}`
			);
			tripStore.setTrips(data);
			estatusTrip.value = estatus;
			loadStore.setLoading(false);
		} catch (error) {
			loadStore.setLoading(false);
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
					timbres,
				},
			} = await instance.get(`/trips/${id}`);
			if (movimientos.length !== 0) {
				const index_origen = movimientos.findIndex((x) => x.patio_timbre);
				const index_destino = movimientos.findLastIndex((x) => x.patio_timbre);
				const origen = movimientos[index_origen].patio;
				const destino = movimientos[index_destino].patio;
				tripStore.setPatios([origen, destino]);
			}
			tripStore.setTrip(trip);
			tripStore.setEmpresa(empresa);
			tripStore.setCliente(cliente);
			tripStore.setOperador(operador);
			tripStore.setCaja(caja);
			tripStore.setTractor(tractor);
			tripStore.setMovimientos(movimientos);
			tripStore.setMercancias(mercancias);
			tripStore.setTimbre(timbres[0]);
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

	const cancelarTrip = async (payload: Trip) => {
		try {
			const response = await question(
				'No podras revertir esto!',
				'Si, cancelar!'
			);
			if (response.isConfirmed) {
				const { data } = await instance.put(`/cancelar-trip/${payload.id}`);
				toast.add({
					severity: 'success',
					summary: 'Trip',
					detail: 'Trip cancelado correctamente',
					life: 3000,
				});
				getTrips(estatusTrip.value);
				getTrip(payload.id);
				return data;
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

	const getComentarios = async (id: number) => {
		try {
			const { data } = await instance.get(`/comentarios-trip/${id}`);
			console.log(data);
			tripStore.setComentarios(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postComentario = async (comentario: Comentario) => {
		try {
			comentario.trip_id = trip.value.id;
			await instance.post(`/agregar-comentario`, comentario);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: 'Comentario agregado correctamente',
				life: 3000,
			});
			getComentarios(trip.value.id);
			comentario.comentarios = null;
		} catch (error) {
			handleError(error);
		}
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
			const response = await question();
			if (response.isConfirmed) {
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
			}
		} catch (error) {
			handleError(error);
		}
	};

	const patioTimbre = async (id: number, estatus: boolean) => {
		try {
			const response = await question(
				!estatus
					? 'Quieres poner este patio para el timbrado?'
					: 'Quieres quitar este patio para el timbrado?',
				'Si'
			);
			if (response.isConfirmed) {
				const { data } = await instance.put(`/patio-timbre/${id}`, {
					estatus: !estatus,
				});
				toast.add({
					severity: 'success',
					summary: 'Trip',
					detail: data.data,
					life: 3000,
				});
				getMovimientos(trip.value.id);
			}
		} catch (error) {
			handleError(error);
		}
	};

	const localizacionCaja = async (id: number) => {
		try {
			const response = await question(
				'Quieres poner este patio para localizar la caja!',
				'Si'
			);
			if (response.isConfirmed) {
				const { data } = await instance.put(`/localizacion-caja/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Trip',
					detail: data.data,
					life: 3000,
				});
				getMovimientos(trip.value.id);
			}
		} catch (error) {
			handleError(error);
		}
	};

	const resetFormComentario = () => {
		tripStore.setComentario({
			id: null,
			comentarios: null,
			trip_id: null,
			createdAt: null,
			isMine: false,
			usuario: null,
		});
	};

	return {
		trip,
		trips,
		estatusTrip,
		from,
		to,
		movimiento,
		movimientos,
		comentario,
		comentarios,
		nombre_cliente,
		nombre_operador,
		numero_economico_caja,
		numero_economico_tractor,
		timbre,
		getTrip,
		getTrips,
		postTrip,
		putTrip,
		cancelarTrip,
		deleteTrip,
		selectCliente,
		selectOperador,
		selectCaja,
		selectTractor,
		selectPatio,
		agregarMovimiento,
		patioTimbre,
		localizacionCaja,
		vaciarMovimientos,
		eliminarMovimiento,
		getComentarios,
		postComentario,
	};
};

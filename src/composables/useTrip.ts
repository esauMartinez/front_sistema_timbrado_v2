import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { handleError, question } from '../helpers/messages';
import { useToast } from 'primevue/usetoast';
import { useTripStore } from '../store/trip';
import { Trip } from '../interfaces/Trip';
import { Patio } from '../interfaces/patio.model';
import { usePatioStore } from '../store/patio';
import { Cliente } from '../interfaces/cliente.model';
import { Operador } from '../interfaces/operador.model';
import { Caja } from '../interfaces/caja.model';
import { Tractor } from '../interfaces/tractor.model';
import { router } from '../router';
import { Servicio } from '../interfaces/servicio';
import { Concepto } from '../interfaces/concepto.model';
import { useServicioStore } from '../store/servicio';

export const useTrip = () => {
	const tripStore = useTripStore();
	const patioStore = usePatioStore();
	const servicioStore = useServicioStore();
	const {
		trip,
		trips,
		movimiento,
		movimientos,
		nombre_cliente,
		nombre_operador,
		numero_economico_caja,
		numero_economico_tractor,
		conceptos,
		concepto,
	} = storeToRefs(tripStore);
	const { servicios } = storeToRefs(servicioStore);
	const toast = useToast();

	const getTrips = async () => {
		try {
			const { data } = await instance.get('/trips');
			tripStore.setTrips(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getTrip = async (id: number) => {
		try {
			const { data } = await instance.get(`/trips/${id}`);
			console.log(data);
			tripStore.setTrip(
				data,
				data.cliente,
				data.operador,
				data.caja,
				data.tractor,
				data.conceptos
			);
		} catch (error) {
			handleError(error);
		}
	};

	const postTrip = async () => {
		try {
			await instance.post(`/trips`);
			getTrips();
			toast.removeGroup('bc');
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: 'Trip creado correctamente',
				life: 3000,
			});
		} catch (error) {
			handleError(error);
		}
	};

	const putTrip = async (payload: any) => {
		try {
			payload['movimientos'] = movimientos.value;
			const { data } = await instance.put(`/trips/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: 'Trip actualizado correctamente',
				life: 3000,
			});
			getTrips();
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
				getTrips();
			}
		} catch (error) {
			handleError(error);
		}
	};

	const resetTripForm = () => {
		movimientos.value = [];
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

	const agregarMovimiento = (patio: Patio) => {
		tripStore.addMovimientoToTrip(patio);
		router.go(-1);
	};

	const vaciarMovimientos = () => {
		movimientos.value = [];
	};

	const eliminarMovimiento = (numero_movimiento: number) => {
		movimientos.value = movimientos.value.filter(
			(x) => x.id !== numero_movimiento
		);
	};

	const agregarConcepto = async (concepto: Concepto) => {
		try {
			if (concepto.clave !== null) {
				const servicio = servicios.value.find(
					(x) => x.clave === concepto.clave
				);
				concepto.nombre = servicio?.descripcion;
				concepto.trip_id = trip?.value.id;
			}
			const { data } = await instance.post(`/guardar-concepto-trip`, concepto);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: data.data,
				life: 3000,
			});
			getTrip(trip.value.id);
			router.go(-1);
		} catch (error) {
			handleError(error);
		}
	};

	const eliminarConceptoTrip = async (id: number) => {
		try {
			const { data } = await instance.delete(`/eliminar-concepto-trip/${id}`);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: data.data,
				life: 3000,
			});
			getTrip(trip.value.id);
		} catch (error) {
			handleError(error);
		}
	};

	const agregarIva = () => {
		concepto.value.iva = concepto.value.monto * (16 / 100);
	};

	const agregarRetencion = () => {
		concepto.value.retencion = concepto.value.monto * (0.8 / 100);
	};

	const resetFormConcepto = () => {
		tripStore.setConcepto({
			id: null,
			nombre: null,
			clave: null,
			monto: 0,
			iva: 0,
			retencion: 0,
			tipo: null,
			trip_id: null,
		})
	}

	return {
		trip,
		trips,
		movimiento,
		movimientos,
		nombre_cliente,
		nombre_operador,
		numero_economico_caja,
		numero_economico_tractor,
		conceptos,
		concepto,
		getTrip,
		getTrips,
		postTrip,
		putTrip,
		deleteTrip,
		// resetTripForm,
		selectCliente,
		selectOperador,
		selectCaja,
		selectTractor,
		selectPatio,
		agregarConcepto,
		resetFormConcepto,
		agregarMovimiento,
		vaciarMovimientos,
		eliminarMovimiento,
		eliminarConceptoTrip,
		agregarIva,
		agregarRetencion,
	};
};

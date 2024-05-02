import { storeToRefs } from 'pinia';
import { handleError } from '../helpers/messages';
import { instance } from '../helpers/axiosInstance';
import { useTimbradoStore } from '../store/timbre';
import { useTrip } from './useTrip';
import { useServicioStore } from '../store/servicio';
import { Concepto } from '../interfaces/concepto.model';
import { useToast } from 'primevue/usetoast';
import { router } from '../router';
import { Mercancia } from '../interfaces/mercancia.model';
import { useTripStore } from '../store/trip';
import { Trip } from '../interfaces/trip';

export const useTimbrado = () => {
	const timbradoStore = useTimbradoStore();
	const servicioStore = useServicioStore();
	const tripStore = useTripStore();
	const { trip } = storeToRefs(tripStore);
	const { servicios } = storeToRefs(servicioStore);
	const {
		empresa,
		cliente,
		operador,
		tractor,
		caja,
		concepto,
		conceptos,
		mercancias,
		mercancia,
		mercanciasSat,
		unidadesPeso,
		peligrosos,
	} = storeToRefs(timbradoStore);
	const toast = useToast();

	const getDatosTimbre = async (id: number) => {
		try {
			const { data } = await instance.get(`/getDatosTimbre/${id}`);
			console.log(data);
			timbradoStore.setDatosTimbre(data);
			tripStore.setTrip(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postConcepto = async (concepto: Concepto) => {
		try {
			if (concepto.clave !== null) {
				const servicio = servicios.value.find(
					(x) => x.clave === concepto.clave
				);
				concepto.nombre = servicio?.descripcion;
				concepto.trip_id = trip.value.id;
			}
			const { data } = await instance.post(`/guardar-concepto-trip`, concepto);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: data.data,
				life: 3000,
			});
			router.go(-1);
			getDatosTimbre(trip.value.id);
		} catch (error) {
			handleError(error);
		}
	};

	const eliminarConcepto = async (id: number) => {
		try {
			const { data } = await instance.delete(`/eliminar-concepto-trip/${id}`);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: data.data,
				life: 3000,
			});
			getDatosTimbre(trip.value.id);
		} catch (error) {
			handleError(error);
		}
	};

	const agregarIva = () => {
		if (concepto.value.iva === 0) {
			concepto.value.iva = concepto.value.monto * 0.16;
		} else {
			concepto.value.iva = 0;
		}
	};

	const agregarRetencion = () => {
		if (concepto.value.retencion === 0) {
			concepto.value.retencion = concepto.value.monto * 0.04;
		} else {
			concepto.value.retencion = 0;
		}
	};

	const resetFormConcepto = () => {
		timbradoStore.setConcepto({
			id: null,
			nombre: null,
			clave: null,
			monto: 0,
			iva: 0,
			retencion: 0,
			tipo: null,
			trip_id: null,
		});
	};

	const postMercancia = async (payload: Mercancia) => {
		mercancia.value.trip_id = trip.value.id;
		try {
			const { data } = await instance.post(`/guardar-mercancia-trip`, payload);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: data.data,
				life: 3000,
			});
			getDatosTimbre(trip.value.id);
		} catch (error) {
			handleError(error);
		}
	};

	const deleteMercancia = async (id: number) => {
		try {
			const { data } = await instance.delete(`/eliminar-mercancia-trip/${id}`);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: data.data,
				life: 3000,
			});
			getDatosTimbre(trip.value.id);
		} catch (error) {
			handleError(error);
		}
	};

	const obtenerMercacias = async (payload: string) => {
		console.log(payload);
		if (payload !== '') {
			try {
				const { data } = await instance.get(`/sat-mercancias/${payload}`);
				timbradoStore.setMercanciasSat(data);
			} catch (error) {
				handleError(error);
			}
		}
	};

	const obtenerUnidadesPeso = async (payload: string) => {
		if (payload !== '') {
			try {
				const { data } = await instance.get(`/sat-unidades-peso/${payload}`);
				timbradoStore.setUnidadesPesoSat(data);
			} catch (error) {
				handleError(error);
			}
		}
	};

	const obtenerMaterialesPeligrosos = async (payload: string) => {
		if (payload !== '') {
			try {
				const { data } = await instance.get(
					`/sat-materiales-peligrosos/${payload}`
				);
				timbradoStore.setPeligrosos(data);
			} catch (error) {
				handleError(error);
			}
		}
	};

	const timbrar = async (trip_id: number) => {
		try {
			const { data } = await instance.get(`/timbrar/${trip_id}`);
			console.log(data);
		} catch (error) {
			handleError(error);
		}
	};

	const putRegimenAduanero = async (payload: Trip) => {
		try {
			const { data } = await instance.put(
				`/modificar-regimen-aduanero/${payload.id}`,
				payload
			);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: data.data,
				life: 3000,
			});
			getDatosTimbre(trip.value.id);
		} catch (error) {
			handleError(error);
		}
	};

	return {
		trip,
		concepto,
		empresa,
		cliente,
		operador,
		tractor,
		caja,
		conceptos,
		mercancias,
		mercancia,
		mercanciasSat,
		unidadesPeso,
		peligrosos,
		agregarIva,
		agregarRetencion,
		getDatosTimbre,
		postConcepto,
		eliminarConcepto,
		resetFormConcepto,
		postMercancia,
		deleteMercancia,
		obtenerMaterialesPeligrosos,
		obtenerUnidadesPeso,
		obtenerMercacias,
		timbrar,
		putRegimenAduanero,
	};
};

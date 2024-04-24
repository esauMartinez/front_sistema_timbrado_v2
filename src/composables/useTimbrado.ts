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

export const useTimbrado = () => {
	const timbradoStore = useTimbradoStore();
	const servicioStore = useServicioStore();
	const { servicios } = storeToRefs(servicioStore);
	const { numero_trip, empresa, cliente, concepto, conceptos, mercancias } =
		storeToRefs(timbradoStore);
	const toast = useToast();

	const getDatosTimbre = async (id: number) => {
		try {
			const { data } = await instance.get(`/getDatosTimbre/${id}`);
			timbradoStore.setDatosTimbre(data);
		} catch (error) {
			handleError(error);
		}
	};

	const agregarConcepto = async (concepto: Concepto) => {
		try {
			if (concepto.clave !== null) {
				const servicio = servicios.value.find(
					(x) => x.clave === concepto.clave
				);
				concepto.nombre = servicio?.descripcion;
				concepto.trip_id = numero_trip.value;
			}
			const { data } = await instance.post(`/guardar-concepto-trip`, concepto);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: data.data,
				life: 3000,
			});
			router.go(-1);
			getDatosTimbre(numero_trip.value);
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
			getDatosTimbre(numero_trip.value);
		} catch (error) {
			handleError(error);
		}
	};

	const agregarIva = () => {
		concepto.value.iva = concepto.value.monto * 0.16;
	};

	const agregarRetencion = () => {
		concepto.value.retencion = concepto.value.monto * 0.04;
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

	const agregarMercancia = async (mercancia: Mercancia) => {
		console.log(mercancia);
		// try {
		// 	const { data } = await instance.post(
		// 		`/guardar-mercancia-trip`,
		// 		mercancia
		// 	);
		// 	toast.add({
		// 		severity: 'success',
		// 		summary: 'Trip',
		// 		detail: data.data,
		// 		life: 3000,
		// 	});
		// 	getTrip(trip.value.id);
		// } catch (error) {
		// 	handleError(error);
		// }
	};

	const eliminarMercancia = async (id: number) => {
		try {
			const { data } = await instance.delete(`/eliminar-mercancia-trip/${id}`);
			toast.add({
				severity: 'success',
				summary: 'Trip',
				detail: data.data,
				life: 3000,
			});
			getDatosTimbre(numero_trip.value);
		} catch (error) {
			handleError(error);
		}
	};

	return {
		concepto,
		empresa,
		cliente,
		conceptos,
		agregarIva,
		agregarRetencion,
		mercancias,
		getDatosTimbre,
		agregarConcepto,
		eliminarConcepto,
		resetFormConcepto,
		numero_trip,
	};
};

import { storeToRefs } from 'pinia';
import { handleError, question } from '../helpers/messages';
import { instance } from '../helpers/axiosInstance';
import { useTimbradoStore } from '../store/timbrado';
import { useServicioStore } from '../store/servicio';
import { Concepto } from '../interfaces/concepto.model';
import { useToast } from 'primevue/usetoast';
import { router } from '../router';
import { Mercancia } from '../interfaces/mercancia.model';
import { useTripStore } from '../store/trip';
import { Patio } from '../interfaces/patio.model';
import { usePDFTimbre } from './usePDFTimbre';
import { Trip } from '../interfaces/trip';
import { useTrip } from './useTrip';
import { useLoadStore } from '../store/load';

export const useTimbrado = () => {
	const timbradoStore = useTimbradoStore();
	const servicioStore = useServicioStore();
	const { pdfTimbre } = usePDFTimbre();
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
		timbres,
		mercanciasSat,
		unidadesPeso,
		peligrosos,
		balance,
		isTimbrando,
	} = storeToRefs(timbradoStore);
	const toast = useToast();
	const { getTrips } = useTrip();
	const loadStore = useLoadStore();

	const getDatosTimbre = async (id: number) => {
		try {
			const { data } = await instance.get(`/getDatosTimbre/${id}`);
			const patios: Patio[] = [];
			data.movimientos.forEach((x) => {
				patios.push(x.patio);
			});
			data.movimientos = patios;
			timbradoStore.setDatosTimbre(data);
			tripStore.setTrip(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postConcepto = async (concepto: Concepto) => {
		try {
			console.log(concepto);
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
		const valor =
			empresa.value.tipo_empresa === 'PERSONA_MORAL' ? 0.04 : 0.0125;
		if (concepto.value.retencion === 0) {
			concepto.value.retencion = concepto.value.monto * valor;
		} else {
			concepto.value.retencion = 0;
		}
	};

	const resetFormConcepto = () => {
		timbradoStore.setConcepto({
			id: null,
			nombre: null,
			clave: null,
			clave_unidad: null,
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
			router.go(-1);
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
			const response = await question('Se timbrara el trip', 'Si');
			if (response.isConfirmed) {
				loadStore.setLoading(true);
				const { data } = await instance.get(`/timbrar/${trip_id}`);
				toast.add({
					severity: 'success',
					summary: 'Timbrado',
					detail: data.data,
					life: 3000,
				});
				getDatosTimbre(trip.value.id);
				setTimeout(() => {
					loadStore.setLoading(false);
					pdfTimbre(trip.value.id);
					getTrips('TODOS');
				}, 2000);
			}
		} catch (error) {
			loadStore.setLoading(false);
			handleError(error);
		}
	};

	const cancelarTimbre = async (id: number) => {
		try {
			const response = await question('Se cancelara el timbre', 'Si');
			if (response.isConfirmed) {
				loadStore.setLoading(true);
				const { data } = await instance.get(`/cancelar-timbre/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Trip',
					detail: data.data,
					life: 3000,
				});
				getTrips('TODOS');
				loadStore.setLoading(false);
			}
		} catch (error) {
			loadStore.setLoading(false);
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

	const getBalanceTimbres = async () => {
		try {
			const { data } = await instance.get(`/balance-timbres`);
			timbradoStore.setBalance(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getAcuses = async (id: number) => {
		try {
			const { data } = await instance.get(`/acuses/${id}`);
			timbradoStore.setTimbres(data);
		} catch (error) {
			handleError(error);
		}
	};

	const xmlTimbre = async (trip_id: number) => {
		try {
			const { data } = await instance.get(`/get-xml/${trip_id}`);
			const format_xml = data.replace(/'\'/g, '');
			const a = document.createElement('a');
			const archivo = new Blob([format_xml], { type: 'text/plain' });
			const url = URL.createObjectURL(archivo);
			a.href = url;
			a.download = `XML-TRIP-${trip_id}.xml`;
			a.click();
			URL.revokeObjectURL(url);
		} catch (error) {
			handleError(error);
		}
	};

	const xmlAcuse = async (trip_id: number) => {
		try {
			const { data } = await instance.get(`/get-xml-acuse/${trip_id}`);
			const a = document.createElement('a');
			const archivo = new Blob([data.acuse], { type: 'text/plain' });
			const url = URL.createObjectURL(archivo);
			a.href = url;
			a.download = `XML-ACUSE-${trip_id}.xml`;
			a.click();
			URL.revokeObjectURL(url);
		} catch (error) {
			handleError(error);
		}
	};

	const resetFormMercancia = () => {
		timbradoStore.setMercancia({
			id: null,
			producto: null,
			clave_producto: null,
			unidad_medida: null,
			clave_unidad: null,
			cantidad: 0,
			peso: 0,
			fraccion_arancelaria: null,
			pedimento: null,
			embalaje: null,
			material_peligroso: null,
			clave_material_peligroso: null,
			tipo_materia: null,
			descripcion_materia: null,
			tipo_documento: null,
			rfc_importacion: null,
			identificador_documento_aduanero: null,
			trip_id: null,
		});
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
		timbres,
		balance,
		isTimbrando,
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
		cancelarTimbre,
		putRegimenAduanero,
		resetFormMercancia,
		getBalanceTimbres,
		getAcuses,
		xmlTimbre,
		xmlAcuse,
	};
};

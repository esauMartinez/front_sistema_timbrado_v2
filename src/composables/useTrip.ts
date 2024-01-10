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
import { Concepto } from '../interfaces/concepto.model';
import { useServicioStore } from '../store/servicio';
import { useSocket } from './useSocket';
import { Mercancia } from '../interfaces/mercancia.model';

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
    mercancias,
    mercancia,
		mercanciasSat,
		unidadesPeso
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
      const {
        data: trip,
        data: {
          cliente,
          operador,
          caja,
          tractor,
          conceptos,
          movimientos,
          mercancias,
        },
      } = await instance.get(`/trips/${id}`);
      tripStore.setTrip(trip);
      tripStore.setCliente(cliente);
      tripStore.setOperador(operador);
      tripStore.setCaja(caja);
      tripStore.setTractor(tractor);
      tripStore.setConceptos(conceptos);
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
    } catch (error) {
      handleError(error);
    }
  };

  const putTrip = async (payload: any) => {
    try {
      payload['movimientos'] = movimientos.value;
      const { data } = await instance.put(`/trips/${payload.id}`, payload);
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
        getTrips();
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

  const obtenerConceptos = async (id: number) => {
    const { data } = await instance.get(`/obtener-conceptos-trip/${id}`);
    tripStore.setConceptos(data);
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
      router.go(-1);
      obtenerConceptos(trip.value.id);
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
      obtenerConceptos(trip.value.id);
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
    });
  };

  const obtenerMercacias = async (payload: string) => {
    if (payload !== '') {
      try {
        const { data } = await instance.get(`/sat-mercancias/${payload}`);
        tripStore.setMercanciasSat(data);
        console.log(data);
      } catch (error) {
        handleError(error);
      }
    }
  };

  const obtenerUnidadesPeso = async (payload: string) => {
    if (payload !== '') {
      try {
        const { data } = await instance.get(`/sat-unidades-peso/${payload}`);
				tripStore.setUnidadesPesoSat(data);
        console.log(data);
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
        console.log(data);
      } catch (error) {
        handleError(error);
      }
    }
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
      getTrip(trip.value.id);
    } catch (error) {
      handleError(error);
    }
  };

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
    mercancia,
    mercancias,
		mercanciasSat,
		unidadesPeso,
    obtenerMercacias,
    obtenerUnidadesPeso,
    obtenerMaterialesPeligrosos,
    agregarMercancia,
    eliminarMercancia,
  };
};

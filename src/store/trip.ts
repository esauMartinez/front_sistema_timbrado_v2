import { defineStore } from 'pinia';
import { Trip } from '../interfaces/Trip';
import { Patio } from '../interfaces/patio.model';
import { Movimiento } from '../interfaces/movimiento.model';
import { Cliente } from '../interfaces/cliente.model';
import { Operador } from '../interfaces/operador.model';
import { Caja } from '../interfaces/caja.model';
import { Tractor } from '../interfaces/tractor.model';
import { Servicio } from '../interfaces/servicio';
import { Concepto } from '../interfaces/concepto.model';

interface TripStore {
	trips: Trip[];
	trip: Trip;
	nombre_cliente: string;
	nombre_operador: string;
	numero_economico_caja: string;
	numero_economico_tractor: string;
	movimientos: Movimiento[];
	movimiento: Movimiento;
	conceptos: Concepto[];
	concepto: Concepto;
}

export const useTripStore = defineStore('trip', {
	state: (): TripStore => ({
		trips: [],
		trip: {
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
		},
		nombre_cliente: null,
		nombre_operador: null,
		numero_economico_caja: null,
		numero_economico_tractor: null,
		movimientos: [],
		movimiento: {
			id: null,
			origen_id: null,
			destino_id: null,
			trip_id: null,
		},
		conceptos: [],
		concepto: {
			id: null,
			nombre: null,
			clave: null,
			monto: 0,
			iva: 0,
			retencion: 0,
			tipo: null,
			trip_id: null,
		},
	}),
	actions: {
		setTrip(
			trip: Trip,
			cliente: Cliente,
			operador: Operador,
			caja: Caja,
			tractor: Tractor,
			conceptos: Concepto[]
		) {
			this.trip = trip;
			this.nombre_cliente = cliente?.razon_social;
			this.nombre_operador =
				operador?.nombre + ' ' + operador?.paterno + ' ' + operador?.materno;
			this.numero_economico_caja = caja?.numero_economico;
			this.numero_economico_tractor = tractor?.numero_economico;
			this.conceptos = conceptos;
		},
		setTrips(trips: Trip[]) {
			this.trips = trips;
		},
		setOrigen(origen: Patio) {
			this.origen = origen;
		},
		setDestino(destino: Patio) {
			this.destino = destino;
		},
		addMovimientoToTrip(patio: Patio) {
			this.movimientos.push(patio);
		},
		setConcepto(concepto: Concepto) {
			this.concepto = concepto;
		},	
	},
});

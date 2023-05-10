import { defineStore } from 'pinia';
import { Trip } from '../interfaces/Trip';
import { Patio } from '../interfaces/patio.model';
import { Movimiento } from "../interfaces/movimiento.model";

interface TripStore {
	trips: Trip[];
	trip: Trip;
	nombre_cliente: string;
	nombre_operador: string;
	numero_economico_caja: string;
	numero_economico_tractor: string;
	movimientos: Movimiento[],
	movimiento: Movimiento
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
			trip_id: null
		}
	}),
	actions: {
		setTrip(trip: Trip) {
			this.trip = trip;
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
	},
});

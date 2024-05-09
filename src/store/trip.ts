import { defineStore } from 'pinia';
import { Trip } from '../interfaces/trip';
import { Patio } from '../interfaces/patio.model';
import { Movimiento } from '../interfaces/movimiento.model';
import { Cliente } from '../interfaces/cliente.model';
import { Operador } from '../interfaces/operador.model';
import { Caja } from '../interfaces/caja.model';
import { Tractor } from '../interfaces/tractor.model';
import { Mercancia } from '../interfaces/mercancia.model';
import moment from 'moment';

interface TripStore {
	trips: Trip[];
	trip: Trip;
	nombre_cliente: string;
	nombre_operador: string;
	numero_economico_caja: string;
	numero_economico_tractor: string;
	movimientos: Movimiento[];
	movimiento: Movimiento;
	estatusTrip: string;
	from: string;
	to: string;
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
			cliente_id: null,
			operador_id: null,
			caja_id: null,
			tractor_id: null,
			origen_id: null,
			destino_id: null,
			ventana_carga: null,
			ventana_entrega: null,
			kilometros: null,
			combustible: null,
			viaticos: null,
			casetas: null,
			regimen_aduanero: null,
			referencia: null,
			observaciones: null,
			createdAt: null,
		},
		nombre_cliente: null,
		nombre_operador: null,
		numero_economico_caja: null,
		numero_economico_tractor: null,
		movimientos: [],
		movimiento: {
			id: null,
			numero_movimiento: null,
			patio_id: null,
			trip_id: null,
		},
		estatusTrip: 'TRANSITO',
		from: moment().subtract(1, 'month').format('YYYY-MM-DDT00:00:00'),
		to: moment().format('YYYY-MM-DDT23:59:59'),
	}),
	actions: {
		setTrip(trip: Trip) {
			this.trip = trip;
		},
		setCliente(cliente: Cliente) {
			this.nombre_cliente = cliente?.razon_social;
		},
		setOperador(operador: Operador) {
			this.nombre_operador =
				operador?.nombre === undefined
					? null
					: operador?.nombre +
					  ' ' +
					  operador?.paterno +
					  ' ' +
					  operador?.materno;
		},
		setCaja(caja: Caja) {
			this.numero_economico_caja = caja?.numero_economico;
		},
		setTractor(tractor: Tractor) {
			this.numero_economico_tractor = tractor?.numero_economico;
		},

		setMovimientos(movimientos: Movimiento[]) {
			this.movimientos = movimientos;
		},
		setMercancias(mercancias: Mercancia[]) {
			this.mercancias = mercancias;
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
	},
});

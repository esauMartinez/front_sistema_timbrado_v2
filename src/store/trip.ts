import { defineStore } from 'pinia';
import { Patio } from '../interfaces/patio.model';
import { Movimiento } from '../interfaces/movimiento.model';
import { Cliente } from '../interfaces/cliente.model';
import { Operador } from '../interfaces/operador.model';
import { Caja } from '../interfaces/caja.model';
import { Tractor } from '../interfaces/tractor.model';
import { Mercancia } from '../interfaces/mercancia.model';
import { Trip } from '../interfaces/trip';
import { Empresa } from '../interfaces/empresa.model';
import { Concepto } from '../interfaces/concepto.model';

interface TripStore {
	trips: Trip[];
	trip: Trip;
	cliente: Cliente;
	empresa: Empresa;
	operador: Operador;
	tractor: Tractor;
	caja: Caja;
	conceptos: Concepto[];
	mercancias: Mercancia[];
	patios: Patio[];
	nombre_cliente: string;
	nombre_operador: string;
	numero_economico_caja: string;
	numero_economico_tractor: string;
	movimientos: Movimiento[];
	movimiento: Movimiento;
	estatusTrip: string;
	pdf: string;
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
			kilometros: 0,
			combustible: 0,
			viaticos: 0,
			casetas: 0,
			regimen_aduanero: null,
			referencia: null,
			observaciones: null,
			createdAt: null,
			isTimbrado: false
		},
		cliente: {
			id: null,
			razon_social: null,
			origen: 'nacional',
			codigo_postal: null,
			colonia: null,
			municipio: null,
			estado: null,
			pais: null,
			calle: null,
			numero_exterior: null,
			numero_interior: null,
			rfc: null,
			tax_id: null,
			email: null,
			metodo_pago: null,
			forma_pago: null,
			uso_cfdi: null,
			estatus: true,
		},
		empresa: {
			id: null,
			razon_social: null,
			codigo_postal: null,
			usuarios: null,
			rfc: null,
			email: null,
			password: null,
			token: null,
			certificadoB64: null,
			keyb64: null,
			timbres: null,
			permiso_sct: null,
			numero_permiso_sct: null,
			clave_regimen_fiscal: null,
			descripcion_regimen_fiscal: null,
			logotipo: null,
			calle: null,
			colonia: null,
			municipio: null,
			estado: null,
			pais: null,
			numero_exterior: null,
			numero_interior: null,
			tipo_empresa: null,
		},
		operador: {
			id: null,
			nombre: null,
			paterno: null,
			materno: null,
			fecha_nacimiento: null,
			fecha_ingreso: null,
			curp: null,
			rfc: null,
			codigo_postal: null,
			colonia: null,
			municipio: null,
			estado: null,
			pais: null,
			calle: null,
			numero_exterior: null,
			numero_interior: null,
			licencia: null,
			vencimiento_licencia: null,
			estatus: true,
		},
		tractor: {
			id: null,
			numero_economico: null,
			matricula: null,
			estatus: true,
			numero_serie: null,
			numero_poliza: null,
			vencimiento_poliza: null,
			modelo: null,
			aseguradora: null,
			configuracion: null,
			marca_id: null,
			clase_id: null,
			peso: null,
		},
		caja: {
			id: null,
			numero_economico: null,
			matricula: null,
			estatus: true,
			numero_serie: null,
			numero_poliza: null,
			vencimiento_poliza: null,
			modelo: null,
			aseguradora: null,
			configuracion: null,
			marca_id: null,
			clase_id: null,
		},
		conceptos: [],
		mercancias: [],
		patios: [],
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
		pdf: null,
	}),
	actions: {
		setEmpresa(empresa: Empresa) {
			this.empresa = empresa;
		},
		setTrip(trip: Trip) {
			this.trip = trip;
		},
		setCliente(cliente: Cliente) {
			this.cliente = cliente;
			this.nombre_cliente = cliente?.razon_social;
		},
		setOperador(operador: Operador) {
			this.operador = operador;
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
			this.caja = caja;
			this.numero_economico_caja = caja?.numero_economico;
		},
		setTractor(tractor: Tractor) {
			this.tractor = tractor;
			this.numero_economico_tractor = tractor?.numero_economico;
		},
		setMovimientos(movimientos: Movimiento[]) {
			this.movimientos = movimientos;
		},
		setPatios(patios: Patio[]) {
			this.patios = patios;
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
		setPDF(pdf: string) {
			this.pdf = pdf;
		},
	},
});

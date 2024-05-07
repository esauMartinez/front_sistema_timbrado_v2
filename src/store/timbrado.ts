import { defineStore } from 'pinia';
import { Cliente } from '../interfaces/cliente.model';
import { Empresa } from '../interfaces/empresa.model';
import { Concepto } from '../interfaces/concepto.model';
import { Mercancia } from '../interfaces/mercancia.model';
import { MercanciasSat, Peligroso, UnidadPeso } from '../interfaces/sat.model';
import { Operador } from '../interfaces/operador.model';
import { Tractor } from '../interfaces/tractor.model';
import { Caja } from '../interfaces/caja.model';
import { Balance, Timbre } from '../interfaces/timbre.model';
import { Patio } from '../interfaces/patio.model';

interface TimbreStore {
	cliente: Cliente;
	empresa: Empresa;
	operador: Operador;
	tractor: Tractor;
	caja: Caja;
	conceptos: Concepto[];
	mercancia: Mercancia;
	mercancias: Mercancia[];
	concepto: Concepto;
	mercanciasSat: MercanciasSat[];
	unidadesPeso: UnidadPeso[];
	peligrosos: Peligroso[];
	timbres: Timbre[];
	movimientos: Patio[];
	balance: Balance;
	pdf: string;
	isTimbrando: boolean;
}

export const useTimbradoStore = defineStore('timbrado', {
	state: (): TimbreStore => ({
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
		concepto: {
			id: null,
			nombre: null,
			clave: null,
			clave_unidad: null,
			monto: 0,
			iva: 0,
			retencion: 0,
			tipo: null,
			trip_id: null,
		},
		mercancias: [],
		mercancia: {
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
		},
		mercanciasSat: [],
		unidadesPeso: [],
		peligrosos: [],
		movimientos: [],
		timbres: [],
		balance: {
			expirationDate: null,
			idUser: null,
			idUserBalance: null,
			isUnlimited: null,
			stampsAssigned: null,
			stampsBalance: null,
			stampsUsed: null,
		},
		pdf: null,
		isTimbrando: false,
	}),
	actions: {
		setDatosTimbre(timbre: TimbreStore) {
			this.cliente = timbre.cliente;
			this.operador = timbre.operador;
			this.tractor = timbre.tractor;
			this.caja = timbre.caja;
			this.empresa = timbre.empresa;
			this.conceptos = timbre.conceptos;
			this.mercancias = timbre.mercancias;
			this.timbres = timbre.timbres;
			this.movimientos = timbre.movimientos;
		},
		setConceptos(conceptos: Concepto[]) {
			this.conceptos = conceptos;
		},
		setConcepto(concepto: Concepto) {
			this.concepto = concepto;
		},
		setMercancia(mercancia: Mercancia) {
			this.mercancia = mercancia;
		},
		setMercanciasSat(mercanciasSat: MercanciasSat[]) {
			this.mercanciasSat = mercanciasSat;
		},
		setUnidadesPesoSat(unidadesPeso: UnidadPeso[]) {
			this.unidadesPeso = unidadesPeso;
		},
		setPeligrosos(peligrosos: Peligroso) {
			this.peligrosos = peligrosos;
		},
		setPDF(pdf: string) {
			this.pdf = pdf;
		},
		setBalance(balance: Balance) {
			this.balance = balance;
		},
	},
});

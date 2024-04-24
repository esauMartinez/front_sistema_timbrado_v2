import { defineStore } from 'pinia';
import { Cliente } from '../interfaces/cliente.model';
import { Empresa } from '../interfaces/empresa.model';
import { Concepto } from '../interfaces/concepto.model';
import { Mercancia } from '../interfaces/mercancia.model';

interface TimbreStore {
	numero_trip: number;
	cliente: Cliente;
	empresa: Empresa;
	conceptos: Concepto[];
	mercancias: Mercancia[];
	concepto: Concepto;
}

export const useTimbradoStore = defineStore('timbrado', {
	state: (): TimbreStore => ({
		numero_trip: null,
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
		mercancias: [],
	}),
	actions: {
		setDatosTimbre(timbre: TimbreStore) {
			this.numero_trip = +timbre.numero_trip;
			this.cliente = timbre.cliente;
			this.empresa = timbre.empresa;
			this.conceptos = timbre.conceptos;
			this.mercancias = timbre.mercancias;
		},
		setConceptos(conceptos: Concepto[]) {
			this.conceptos = conceptos;
		},
		setConcepto(concepto: Concepto) {
			this.concepto = concepto;
		},
	},
});

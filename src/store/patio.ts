import { defineStore } from 'pinia';
import { Patio } from '@/interfaces/patio.model';
import { CodigoPostal } from '@/interfaces/codigo_postal.model';

interface PatioStore {
	patios: Patio[];
	patio: Patio;
	codigos: CodigoPostal[];
}

export const usePatioStore = defineStore('patio', {
	state: (): PatioStore => ({
		patios: [],
		patio: {
			id: null,
			nombre: null,
			codigo_postal: null,
			colonia: null,
			c_colonia: null,
			referencia: null,
			municipio: null,
			c_municipio: null,
			estado: null,
			c_estado: null,
			pais: null,
			c_pais: null,
			calle: null,
			numero_exterior: null,
			numero_interior: null,
			localidad: null,
			estatus: true,
			tipo: null,
			rfc: null,
		},
		codigos: [],
	}),
	actions: {
		setPatios(patios: Patio[]) {
			this.patios = patios;
		},
		setPatio(patio: Patio) {
			this.patio = patio;
		},
		setCodigos(codigos: CodigoPostal[]) {
			this.codigos = codigos;
		},
	},
});

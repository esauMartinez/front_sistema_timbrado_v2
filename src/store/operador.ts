import { defineStore } from 'pinia';
import { Operador } from '@/interfaces/operador.model';

interface OperadorStore {
	operadores: Operador[];
	operador: Operador;
}

export const useOperadorStore = defineStore('operador', {
	state: (): OperadorStore => ({
		operadores: [],
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
	}),
	actions: {
		setOperadores(operadores: Operador[]) {
			this.operadores = operadores;
		},
		setOperador(operador: Operador) {
			this.operador = operador;
		},
	},
});

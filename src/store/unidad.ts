import { defineStore } from 'pinia';
import { Unidad } from '../interfaces/unidad.model';
import { Marca } from '../interfaces/marca.model';
import { Configuracion } from '../interfaces/configuracion';

interface UnidadStore {
	unidades: Unidad[];
	unidad: Unidad;
	marcas: Marca[];
	marca: Marca;
	configuraciones: Configuracion[];
}

export const useUnidadStore = defineStore('unidades', {
	state: (): UnidadStore => ({
		unidades: [],
		unidad: {
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
			linea: null,
		},
		marcas: [],
		marca: {
			id: null,
			nombre: null,
			tipo: null,
			empresa_id: null,
		},
		configuraciones: [],
	}),
	actions: {
		setMarca(marca: Marca) {
			this.marca = marca;
		},
		setUnidad(unidad: Unidad) {
			this.unidad = unidad;
		},
		setUnidades(unidades: Unidad[]) {
			this.unidades = unidades;
		},
		setMarcas(marcas: Marca[]) {
			this.marcas = marcas;
		},
		setConfiguracions(configuraciones: Configuracion[]) {
			this.configuraciones = configuraciones;
		},
	},
});

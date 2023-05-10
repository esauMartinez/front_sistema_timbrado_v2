import { defineStore } from 'pinia';
import { Servicio } from '../interfaces/servicio';

interface ServicioStore {
	servicios: Servicio[];
	servicio: Servicio;
}

export const useServicioStore = defineStore('servicio', {
	state: (): ServicioStore => ({
		servicios: [],
		servicio: {
			id: null,
			clave: null,
			descripcion: null,
      estatus: true
		},
	}),
	actions: {
		setServicio(servicio: Servicio) {
			this.servicio = servicio;
		},
		setServicios(servicios: Servicio[]) {
			this.servicios = servicios;
		},
	},
});

import { Permiso } from './modulos.model';

export interface Rol {
	id: number;
	nombre: string;
	permisos: Permiso[];
}

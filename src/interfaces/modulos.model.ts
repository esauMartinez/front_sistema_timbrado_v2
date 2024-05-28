export interface Modulo {
	id: number;
	nombre: string;
	descripcion: string;
	permisos: Permiso[];
}

export interface Permiso {
	id: number;
	nombre: string;
	descripcion: string;
	modulo_id: number;
	seleccionado: boolean;
	modulo: Modulo;
}

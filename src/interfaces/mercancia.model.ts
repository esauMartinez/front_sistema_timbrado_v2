export interface Mercancia {
	id: number;
	producto: string;
	clave_producto: string;
	unidad_medida: string;
	clave_unidad: string;
	cantidad: number;
	peso: number;
	fraccion_arancelaria: string;
	pedimento: string;
	embalaje: string;
	material_peligroso: string;
	clave_material_peligroso: string;
	tipo_materia: string;
	descripcion_materia: string;
	tipo_documento: string;
	rfc_importacion: string;
	identificador_documento_aduanero: string;
	trip_id: number;
}

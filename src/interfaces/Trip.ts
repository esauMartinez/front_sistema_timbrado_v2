export interface Trip {
	id: number;
	estatus: string;
	observaciones_cancelacion: string;
	tipo: string;
	numero_cotizacion: string;
	moneda: string;
	tipo_viaje: string;
	numero_trip: number;
	metodo_pago: string;
	forma_pago: string;
	uso_CFDI: string;
	fecha_salida: Date;
	fecha_llegada: Date;
	kilometros: string;
	cliente_id: number;
	operador_id: number;
	caja_id: number;
	tractor_id: number;
	origen_id: number;
	destino_id: number;
}

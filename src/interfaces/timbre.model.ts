export interface Timbre {
	id: number;
	cadena_original_sat: string;
	numero_certificado_sat: string;
	numero_certificado_cfdi: string;
	uuid: string;
	sello_sat: string;
	sello_cfdi: string;
	fecha_timbrado: Date;
	estatus: string;
	codigo_qr: string;
	cfdi: string;
	serie: string;
	trip_id: number;
}

export interface Balance {
	expirationDate: string;
	idUser: string;
	idUserBalance: string;
	isUnlimited: string;
	stampsAssigned: string;
	stampsBalance: string;
	stampsUsed: string;
}

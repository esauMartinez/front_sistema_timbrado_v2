export interface Empresa {
	id: number;
	razon_social: string;
	codigo_postal: string;
	usuarios: number;
	rfc: string;
	email: string;
	password: string;
	token: string;
	certificadoB64: string;
	keyb64: string;
	timbres: number;
	permiso_sct: string;
	numero_permiso_sct: string;
	clave_regimen_fiscal: string;
	descripcion_regimen_fiscal: string;
	logotipo: string;
	calle: string;
	colonia: string;
	municipio: string;
	estado: string;
	pais: string;
	numero_exterior: string;
	numero_interior: string;
}

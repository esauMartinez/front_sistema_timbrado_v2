import { defineStore } from 'pinia';
import { Empresa } from '../interfaces/empresa.model';

interface EmpresaStore {
	empresas: [];
	empresa: Empresa;
}

export const useEmpresaStore = defineStore('empresa', {
	state: (): EmpresaStore => ({
		empresas: [],
		empresa: {
			id: null,
			razon_social: null,
			codigo_postal: null,
			usuarios: null,
			rfc: null,
			email: null,
			password: null,
			token: null,
			certificadoB64: null,
			keyb64: null,
			timbres: null,
			permiso_sct: null,
			numero_permiso_sct: null,
			clave_regimen_fiscal: null,
			descripcion_regimen_fiscal: null,
			logotipo: null,
			calle: null,
			colonia: null,
			municipio: null,
			estado: null,
			pais: null,
			numero_exterior: null,
			numero_interior: null,
			tipo_empresa: null,
		},
	}),
	actions: {
		setEmpresa(empresa: Empresa) {
			this.empresa = empresa;
		},
		setEmpresas(empresas: Empresa[]) {
			this.empresas = empresas;
		},
	},
});

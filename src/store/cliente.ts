import { defineStore } from 'pinia';
import {
	Cliente,
	FormasPago,
	MetodosPago,
	RegimenFiscal,
	UsoCfdi,
} from '@/interfaces/cliente.model';

interface Bitacora {
	comentarios: string;
	evento: string;
	createdAt: string;
}

export interface Contacto {
	id: number;
	nombre: string;
	telefono: string;
	email: string;
	turno: string;
	cliente_id: number;
}

interface ClienteStore {
	clientes: Cliente[];
	cliente: Cliente;
	usoCfdi: UsoCfdi[];
	metodosPago: MetodosPago[];
	formasPago: FormasPago[];
	regimenFiscal: RegimenFiscal[];
	bitacora: Bitacora[];
	contacto: Contacto;
	contactos: Contacto[];
}

export const useClienteStore = defineStore('cliente', {
	state: (): ClienteStore => ({
		clientes: [],
		cliente: {
			id: null,
			razon_social: null,
			origen: 'nacional',
			codigo_postal: null,
			colonia: null,
			municipio: null,
			estado: null,
			pais: null,
			calle: null,
			numero_exterior: null,
			numero_interior: null,
			rfc: null,
			tax_id: null,
			email: null,
			metodo_pago: null,
			forma_pago: null,
			uso_cfdi: null,
			estatus: true,
			evento: null,
			comentarios: null,
		},
		usoCfdi: [],
		metodosPago: [],
		formasPago: [],
		regimenFiscal: [],
		bitacora: [],
		contacto: {
			id: null,
			nombre: null,
			telefono: null,
			email: null,
			turno: null,
			cliente_id: null,
		},
		contactos: [],
	}),
	actions: {
		setClientes(clientes: Cliente[]) {
			this.clientes = clientes;
		},
		setCliente(cliente: Cliente) {
			this.cliente = cliente;
		},
		setUsoCFDI(usoCfdi: UsoCfdi[]) {
			this.usoCfdi = usoCfdi;
		},
		setMetodosPago(metodosPago: MetodosPago[]) {
			this.metodosPago = metodosPago;
		},
		setFormasPago(formasPago: FormasPago[]) {
			this.formasPago = formasPago;
		},
		setRegimenFiscal(regimenFiscal: RegimenFiscal[]) {
			this.regimenFiscal = regimenFiscal;
		},
		setBitacora(bitacora: Bitacora[]) {
			this.bitacora = bitacora;
		},
		setContacto(contacto: Contacto) {
			this.contacto = contacto;
		},
		setContactos(contactos: Contacto[]) {
			this.contactos = contactos;
		},
	},
});

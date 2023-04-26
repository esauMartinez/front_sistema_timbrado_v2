import { defineStore } from 'pinia';
import {
	Cliente,
	FormasPago,
	MetodosPago,
	UsoCfdi,
} from '../interfaces/cliente.model';

interface ClienteStore {
	clientes: Cliente[];
	cliente: Cliente;
	usoCfdi: UsoCfdi[];
	metodosPago: MetodosPago[];
	formasPago: FormasPago[];
}

export const useClienteStore = defineStore('cliente', {
	state: (): ClienteStore => ({
		clientes: [],
		cliente: {
			id: null,
			razon_social: null,
			origen: null,
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
		},
		usoCfdi: [],
		metodosPago: [],
		formasPago: [],
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
	},
});

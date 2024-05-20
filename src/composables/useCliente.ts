import { storeToRefs } from 'pinia';
import { Contacto, useClienteStore } from '../store/cliente';
import { instance } from '../helpers/axiosInstance';
import { useToast } from 'primevue/usetoast';
import { comentarios, handleError, question } from '../helpers/messages';
import { Cliente } from '../interfaces/cliente.model';
import { router } from '../router';

export const useCliente = () => {
	const clienteStore = useClienteStore();
	const {
		cliente,
		clientes,
		usoCfdi,
		metodosPago,
		formasPago,
		regimenFiscal,
		bitacora,
		contacto,
		contactos,
	} = storeToRefs(clienteStore);
	const toast = useToast();

	const getClientes = async () => {
		try {
			const { data } = await instance.get('/clientes');
			clienteStore.setClientes(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getCliente = async (id: number) => {
		try {
			const { data } = await instance.get(`/clientes/${id}`);
			clienteStore.setCliente(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postCliente = async (cliente: Cliente) => {
		try {
			const { data } = await instance.post('/clientes', cliente);
			toast.add({
				severity: 'success',
				summary: 'Cliente',
				detail: 'Cliente creado correctamente',
				life: 3000,
			});
			getClientes();
			router.go(-1);
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	const putCliente = async (payload: any) => {
		try {
			if (payload.estatus) {
				payload.evento = 'ACTIVACION';
			} else {
				payload.evento = 'DESACTIVACION';
			}

			const response_comentarios: any = await comentarios();
			if (response_comentarios.isConfirmed) {
				payload.comentarios = response_comentarios.value;
				await instance.put(`/clientes/${payload.id}`, payload);
				toast.add({
					severity: 'success',
					summary: 'Cliente',
					detail: 'Cliente actualizado correctamente',
					life: 3000,
				});
			}
			getClientes();
			return true;
		} catch (error) {
			handleError(error);
			return false;
		}
	};

	const deleteCliente = async (id: number) => {
		try {
			const response = await question();
			if (response.isConfirmed) {
				await instance.delete(`/clientes/${id}`);
				toast.add({
					severity: 'success',
					summary: 'Cliente',
					detail: 'Cliente eliminado correctamente',
					life: 3000,
				});
				getClientes();
			}
		} catch (error) {
			handleError(error);
		}
	};

	const getContactos = async (id: number) => {
		try {
			const { data } = await instance.get(`/cliente/contactos/${id}`);
			clienteStore.setContactos(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postContacto = async (contacto: Contacto) => {
		try {
			const { data } = await instance.post('/cliente/contacto', contacto);
			toast.add({
				severity: 'success',
				summary: 'Cliente',
				detail: data.data,
				life: 3000,
			});
			resetFormContacto();
			getContactos(contacto.cliente_id);
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	const getUsoCfdi = async () => {
		const { data } = await instance.get('/uso-cfdi');
		clienteStore.setUsoCFDI(data);
	};

	const getMetodosPago = async () => {
		const { data } = await instance.get('/metodos-pago');
		clienteStore.setMetodosPago(data);
	};

	const getFormasPago = async () => {
		const { data } = await instance.get('/formas-pago');
		clienteStore.setFormasPago(data);
	};

	const getRegimenFiscal = async () => {
		const { data } = await instance.get('/regimen-fiscal');
		clienteStore.setRegimenFiscal(data);
	};

	const getBitacoraCliente = async (id: number) => {
		const { data } = await instance.get(`/cliente/bitacora/${id}`);
		clienteStore.setBitacora(data);
	};

	const resetClienteForm = () => {
		clienteStore.setCliente({
			id: 0,
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
		});
	};

	const resetFormContacto = () => {
		clienteStore.setContacto({
			id: null,
			nombre: null,
			telefono: null,
			email: null,
			turno: null,
			cliente_id: null,
		});
	};

	return {
		cliente,
		clientes,
		usoCfdi,
		metodosPago,
		formasPago,
		regimenFiscal,
		bitacora,
		contacto,
		contactos,
		getClientes,
		getCliente,
		postCliente,
		putCliente,
		deleteCliente,
		getUsoCfdi,
		getMetodosPago,
		getFormasPago,
		getRegimenFiscal,
		resetClienteForm,
		resetFormContacto,
		getBitacoraCliente,
		getContactos,
		postContacto,
	};
};

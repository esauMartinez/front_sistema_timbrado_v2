import { storeToRefs } from 'pinia';
import { useClienteStore } from '../store/cliente';
import { instance } from '../helpers/axiosInstance';
import { useToast } from 'primevue/usetoast';
import { handleError, question } from '../helpers/messages';
import { Cliente } from '../interfaces/cliente.model';
import { router } from '../router';

export const useCliente = () => {
	const clienteStore = useClienteStore();
	const { cliente, clientes, usoCfdi, metodosPago, formasPago } =
		storeToRefs(clienteStore);
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
			await instance.put(`/clientes/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Cliente',
				detail: 'Cliente actualizado correctamente',
				life: 3000,
			});
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

	return {
		cliente,
		clientes,
		usoCfdi,
		metodosPago,
		formasPago,
		getClientes,
		getCliente,
		postCliente,
		putCliente,
		deleteCliente,
		getUsoCfdi,
		getMetodosPago,
		getFormasPago,
		resetClienteForm,
	};
};

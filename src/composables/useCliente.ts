import { storeToRefs } from 'pinia';
import { useClienteStore } from '../store/cliente';
import { instance } from '../helpers/axiosInstance';
import { useToast } from 'primevue/usetoast';
import { error, question } from '../helpers/messages';
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
		} catch (err) {
			error(err);
		}
	};

	const getCliente = async (id: number) => {
		try {
			const { data } = await instance.get(`/clientes/${id}`);
			clienteStore.setCliente(data);
		} catch (err) {
			error(err);
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
		} catch (err) {
			error(err);
		}
	};

	const putCliente = async (payload: any) => {
		try {
			const { data } = await instance.put(`/clientes/${payload.id}`, payload);
			toast.add({
				severity: 'success',
				summary: 'Cliente',
				detail: 'Cliente actualizado correctamente',
				life: 3000,
			});
			getClientes();
			return data;
		} catch (err) {
			error(err);
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
		} catch (err) {
			error(err);
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
			razon_social: '',
			origen: '',
			codigo_postal: '',
			colonia: '',
			municipio: '',
			estado: '',
			pais: '',
			calle: '',
			numero_exterior: '',
			numero_interior: '',
			rfc: '',
			tax_id: '',
			email: '',
			metodo_pago: '',
			forma_pago: '',
			uso_cfdi: '',
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

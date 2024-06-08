import { storeToRefs } from 'pinia';
import { useUnidadStore } from '@/store/unidad';
import { instance } from '@/helpers/axiosInstance';
import { handleError } from '@/helpers/messages';
import { Marca } from '@/interfaces/marca.model';
import { useToast } from 'primevue/usetoast';
import { router } from '@/router';

export const useMarca = () => {
	const unidadStore = useUnidadStore();

	const { marca, marcas } = storeToRefs(unidadStore);
	const toast = useToast();

	const getMarcas = async (tipo: string) => {
		try {
			const { data } = await instance.get(`/marcas/${tipo}`);
			unidadStore.setMarcas(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postMarca = async (payload: Marca) => {
		try {
			const { data } = await instance.post('/marcas', payload);
			toast.add({
				severity: 'success',
				summary: 'Patio',
				detail: 'Marca agregada correctamente',
				life: 3000,
			});
			router.go(-1);
			getMarcas(marca.value.tipo);
		} catch (error) {
			handleError(error);
		}
	};

	const deleteMarca = async (id: number) => {
		try {
			const { data } = await instance.delete(`/marcas/${id}`);
			toast.add({
				severity: 'success',
				summary: 'Patio',
				detail: 'Marca eliminada correctamente',
				life: 3000,
			});
		} catch (error) {
			handleError(error);
		}
	};

	const resetMarcaForm = () => {
		unidadStore.setMarca({
			id: null,
			nombre: null,
			tipo: null,
			empresa_id: null,
		});
	};

	return { marca, marcas, getMarcas, postMarca, deleteMarca, resetMarcaForm };
};

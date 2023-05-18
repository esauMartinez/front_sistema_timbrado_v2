import { storeToRefs } from 'pinia';
import { useEmpresaStore } from '../store/empresa';
import { instance } from '../helpers/axiosInstance';
import { handleError} from '../helpers/messages';
import { Empresa } from '../interfaces/empresa.model';
import { useToast } from 'primevue/usetoast';
import Compressor from 'compressorjs';

export const useEmpresa = () => {
	const empresaStore = useEmpresaStore();
	const { empresa } = storeToRefs(empresaStore);
	const toast = useToast();

	const getEmpresa = async (id: number) => {
		try {
			const { data } = await instance.get(`/empresas/${id}`);
			empresaStore.setEmpresa(data);
		} catch (error) {
			handleError(error);
		}
	};

	const uploadLogo = (e) => {
		try {
			new Compressor(e.files[0], {
				quality: 0.6,
				async success(result: any) {
					const formData = new FormData();
					formData.append('logo', result, result.name);
					instance.defaults.headers.common[
						'Content-Type'
					] = `multipart/form-data`;

					await instance.post('/empresas/upload/logo', formData);

					toast.add({
						severity: 'success',
						summary: 'Logotipo',
						detail: 'Logotipo subido correctamente',
						life: 3000,
					});
				},
			});
		} catch (error) {
			toast.add({
				severity: 'error',
				summary: 'Logotipo',
				detail: 'Error al subir el logotipo',
				life: 3000,
			});
		}
	};

	const saveChanges = (empresa: Empresa) => {
		console.log(empresa);
	};

	return {
		empresa,
		getEmpresa,
		saveChanges,
		uploadLogo,
	};
};

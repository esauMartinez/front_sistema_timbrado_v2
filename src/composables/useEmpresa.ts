import { storeToRefs } from 'pinia';
import { useEmpresaStore } from '../store/empresa';
import { instance } from '../helpers/axiosInstance';
import { handleError } from '../helpers/messages';
import { Empresa } from '../interfaces/empresa.model';
import { useToast } from 'primevue/usetoast';
import Compressor from 'compressorjs';
import { useUsuarioStore } from '../store/usuario';
import { Usuario } from '../interfaces/usuario.model';
import { router } from '../router';
import { FileUploadSelectEvent } from 'primevue/fileupload';
import { ref } from 'vue';

export const useEmpresa = () => {
	const empresaStore = useEmpresaStore();
	const usuarioStore = useUsuarioStore();
	const { empresa, empresas } = storeToRefs(empresaStore);
	const toast = useToast();

	const getEmpresas = async () => {
		try {
			const { data } = await instance.get(`/empresas`);
			empresaStore.setEmpresas(data);
		} catch (error) {
			handleError(error);
		}
	};

	const getEmpresa = async () => {
		try {
			const { data } = await instance.get(`/empresa`);
			empresaStore.setEmpresa(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postEmpresa = async (payload: Empresa) => {
		try {
			const { data } = await instance.post(`/empresas`, payload);
			console.log(data);
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

	const putEmpresa = async (empresa: Empresa) => {
		try {
			const { data } = await instance.put(`/empresa`, empresa);
			toast.add({
				severity: 'success',
				summary: 'Logotipo',
				detail: data.data,
				life: 3000,
			});
			getEmpresa();
		} catch (error) {
			handleError(error);
		}
	};

	const getUsuariosEmpresa = async (id: number) => {
		try {
			const { data } = await instance.get(`/empresas/usuarios/${id}`);
			empresa.value.id = id;
			usuarioStore.setUsuarios(data);
		} catch (error) {
			handleError(error);
		}
	};

	const postUsuarioEmpresa = async (payload: Usuario) => {
		try {
			const { data } = await instance.post(`/empresas/alta/usuario`, payload);
			toast.add({
				severity: 'success',
				summary: 'Usuario',
				detail: 'Usuario creado correctamente',
				life: 3000,
			});
			getUsuariosEmpresa(payload.empresa_id);
			router.go(-1);
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	let formCertificados = new FormData();
	let passwordCertificado = ref(null);

	const certificado = (e: FileUploadSelectEvent) => {
		formCertificados.append('cer', e.files[0]);
	};

	const key = (e: FileUploadSelectEvent) => {
		formCertificados.append('key', e.files[0]);
	};

	const postCertificados = async () => {
		try {
			formCertificados.append('password', passwordCertificado.value);
			const { data } = await instance.post(
				`/cargar/certificados`,
				formCertificados
			);
			toast.add({
				severity: 'success',
				summary: 'Usuario',
				detail: data.data,
				life: 3000,
			});
			return data;
		} catch (error) {
			handleError(error);
		}
	};

	return {
		empresa,
		empresas,
		certificado,
		key,
		passwordCertificado,
		getEmpresa,
		getEmpresas,
		postEmpresa,
		putEmpresa,
		uploadLogo,
		postCertificados,
		getUsuariosEmpresa,
		postUsuarioEmpresa,
	};
};

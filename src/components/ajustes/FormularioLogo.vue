<script lang="ts" setup>
import { useToast } from 'primevue/usetoast';
import { instance } from '../../helpers/axiosInstance';

const toast = useToast();

const upload = async (e) => {
	try {
		const formData = new FormData();
		formData.append('logo', e.files[0]);
		instance.defaults.headers.common['Content-Type'] = `multipart/form-data`;
		const { data } = await instance.post('/empresas/upload/logo', formData);
		toast.add({
			severity: 'success',
			summary: 'Logotipo',
			detail: 'Logotipo subido correctamente',
			life: 3000,
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
</script>
<template>
	<FileUpload
		name="demo[]"
		url="https://www.primefaces.org/upload.php"
		@upload="upload($event)"
		:multiple="false"
		accept="image/*"
		:maxFileSize="1000000"
	>
		<template #empty>
			<p>Drag and drop files to here to upload.</p>
		</template>
	</FileUpload>
</template>

<script lang="ts" setup>
import { FileUploadSelectEvent } from 'primevue/fileupload';
import { ref } from 'vue';
import { instance } from '../../helpers/axiosInstance';

let formData = new FormData();
const password = ref(null);

const certificado = (e: FileUploadSelectEvent) => {
	formData.append('cer', e.files[0]);
};

const key = (e: FileUploadSelectEvent) => {
	formData.append('key', e.files[0]);
};

const postCertificados = async () => {
	formData.append('password', password.value);
	const { data } = await instance.post(`/cargar/certificados`, formData);
	console.log(data);
	formData = new FormData();
};
</script>

<template>
	<form @submit.prevent="postCertificados">
		<div class="grid">
			<div class="col-6">
				<FileUpload
					mode="basic"
					name="demo[]"
					class="w-full"
					chooseLabel="Certificado(.cer)"
					customUpload
					accept=".cer"
					@select="certificado($event)"
				/>
			</div>
			<div class="col-6">
				<FileUpload
					mode="basic"
					name="demo[]"
					class="w-full"
					chooseLabel="Key(.key)"
					customUpload
					accept=".key"
					@select="key($event)"
				/>
			</div>
			<div class="col-12">
				<InputText required="true" v-model="password" class="w-full" />
			</div>
			<div class="col-2 col-offset-10">
				<Button type="submit" label="Guardar certificados" />
			</div>
		</div>
	</form>
</template>

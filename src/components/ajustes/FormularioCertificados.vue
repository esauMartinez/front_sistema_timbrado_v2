<script lang="ts" setup>
import { ref } from 'vue';
import { useEmpresa } from '../../composables/useEmpresa';

const { certificado, key, postCertificados, passwordCertificado } = useEmpresa();
const password = ref(null);
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
					@select="certificado"
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
					@select="key"
				/>
			</div>
			<div class="col-12">
				<InputText required="true" v-model="passwordCertificado" class="w-full" />
			</div>
			<div class="col-2 col-offset-10">
				<Button type="submit" label="Guardar certificados" />
			</div>
		</div>
	</form>
</template>

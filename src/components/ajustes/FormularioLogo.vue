<script lang="ts" setup>
import { ref } from 'vue';
import { useEmpresa } from '@/composables/useEmpresa';

const { uploadLogo } = useEmpresa();

const uploading = ref(false);
const upload = async (e) => {
	uploading.value = true;
	await uploadLogo(e);
	uploading.value = false;
};
</script>

<template>
	<div class="d-flex justify-content-center">
		<ProgressSpinner
			style="width: 50px; height: 50px"
			strokeWidth="8"
			fill="var(--surface-ground)"
			animationDuration=".5s"
			aria-label="Custom ProgressSpinner"
			v-if="uploading"
		/>
	</div>

	<FileUpload
		name="demo[]"
		url="https://www.primefaces.org/upload.php"
		@upload="upload($event)"
		:multiple="false"
		accept="image/*"
		:maxFileSize="1000000"
		v-if="!uploading"
	>
		<template #empty>
			<p>Drag and drop files to here to upload.</p>
		</template>
	</FileUpload>
</template>

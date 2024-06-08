<script lang="ts" setup>
import { useLoad } from '@/composables/useLoad';
const { isLoading } = useLoad();
</script>

<template>
	<Dialog
		v-model:visible="isLoading"
		modal
		:closable="false"
		:style="{ width: '25rem' }"
	>
		<div class="flex justify-content-center flex-column align-items-center">
			<ProgressSpinner class="mb-2" />
			<h2 class="mt-5">Cargando...</h2>
		</div>
	</Dialog>
</template>

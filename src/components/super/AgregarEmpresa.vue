<script lang="ts" setup>
import { ref } from 'vue';
import { router } from '@/router';
import Formulario from './FormularioEmpresa.vue';
import { useEmpresa } from '@/composables/useEmpresa';

const { empresa, postEmpresa } = useEmpresa();

const visible = ref(true);
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Agregar empresa"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario @submit.prevent="postEmpresa(empresa)" id="formulario" />
		<template #footer>
			<Button
				label="Cancelar"
				icon="pi pi-times"
				@click="visible = false"
				outlined
				severity="danger"
			/>
			<Button
				label="Guardar"
				icon="pi pi-check"
				type="submit"
				form="formulario"
				severity="success"
			/>
		</template>
	</Dialog>
</template>

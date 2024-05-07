<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Formulario from './Formulario.vue';
import { router } from '../../../router';
import { useTimbrado } from '../../../composables/useTimbrado';

const { mercancia, postMercancia, resetFormMercancia } = useTimbrado();
const visible = ref(true);

onMounted(() => {
	resetFormMercancia();
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Agregar mercancia"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario
			@submit.prevent="postMercancia(mercancia)"
			id="formulario-mercancia"
		/>
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
				form="formulario-mercancia"
				severity="success"
			/>
		</template>
	</Dialog>
</template>

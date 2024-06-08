<script lang="ts" setup>
import { ref } from 'vue';
import { router } from '@/router';
import Formulario from './Formulario.vue';
import { useTimbrado } from '@/composables/useTimbrado';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
const visible = ref(true);
const { cancelacion, cancelarTimbre, getAcuses, resetFormCancelacion } =
	useTimbrado();
const route = useRoute();
cancelacion.value.id = +route.params.id;

onMounted(async () => {
	await resetFormCancelacion(cancelacion.value.id);
	await getAcuses(+route.params.trip);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Cancelar timbre"
		:style="{ width: '40vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario
			@submit.prevent="cancelarTimbre(cancelacion)"
			id="formulario-cancelacion"
		/>
		<template #footer>
			<Button
				label="Cancelar timbre"
				icon="pi pi-check"
				type="submit"
				form="formulario-cancelacion"
				severity="success"
			/>
		</template>
	</Dialog>
</template>

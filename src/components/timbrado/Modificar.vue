<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useRoute } from 'vue-router';
import { useTimbrado } from '../../composables/useTimbrado';
import { usePDF } from '../../composables/usePDF';
import { useAuth } from '../../composables/useAuth';

const { trip, getDatosTimbre, timbrar, isTimbrando, xmlTimbre } = useTimbrado();
const { getPermiso } = useAuth();
const { pdfTimbre } = usePDF();
const route = useRoute();
const visible = ref(true);

onMounted(async () => {
	await getDatosTimbre(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Datos del timbre"
		:style="{ width: '80vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario />
		<template #footer>
			<ButtonGroup>
				<Button
					icon="pi pi-times"
					label="Cancelar"
					@click="visible = false"
					severity="danger"
				/>
				<Button
					label="XML"
					icon="fa fa-file-code"
					severity="info"
					@click="xmlTimbre(trip.id)"
				/>
				<Button
					label="PDF"
					icon="pi pi-file-pdf"
					severity="info"
					@click="pdfTimbre(trip.id)"
				/>
				<Button
					label="Timbrar"
					icon="pi pi-bell"
					severity="success"
					@click="timbrar(trip.id)"
					v-if="!getPermiso('TIMBRADO', 'crear')"
				/>
			</ButtonGroup>
		</template>
	</Dialog>

	<Dialog
		v-model:visible="isTimbrando"
		modal
		:closable="false"
		:style="{ width: '25rem' }"
	>
		<div class="flex justify-content-center flex-column align-items-center">
			<ProgressSpinner class="mb-2" />
			<h2 class="mt-5">Timbrando...</h2>
		</div>
	</Dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useRoute } from 'vue-router';
import { useTrip } from '../../composables/useTrip';
import { usePDF } from '../../composables/usePDF';
import { useTimbrado } from '../../composables/useTimbrado';

const { trip, getTrip, putTrip } = useTrip();
const { timbres, getDatosTimbre } = useTimbrado();
const { pdfTrip } = usePDF();

const visible = ref(true);
const route = useRoute();

const modificar = async () => {
	await putTrip(trip.value);
};

onMounted(async () => {
	await getTrip(+route.params.id);
	await getDatosTimbre(+route.params.id);
});

const cerrarVentanaTrip = async () => {
	router.go(-1);
};
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Trip"
		:style="{ width: '50vw' }"
		v-on:after-hide="cerrarVentanaTrip()"
	>
		<Formulario @submit.prevent="modificar()" id="formulario" />
		<template #footer>
			<ButtonGroup>
				<Button
					icon="pi pi-times"
					label="Cancelar"
					@click="visible = false"
					severity="danger"
				/>
				<Button
					icon="pi pi-file-pdf"
					label="PDF"
					severity="info"
					@click="pdfTrip(trip.id)"
					v-if="trip.estatus !== 'CREADO'"
				></Button>
				<Button
					icon="pi pi-check"
					label="Guardar"
					type="submit"
					form="formulario"
					severity="success"
					v-if="trip.estatus !== 'TERMINADO'"
				/>
			</ButtonGroup>
		</template>
	</Dialog>
	<router-view></router-view>
</template>

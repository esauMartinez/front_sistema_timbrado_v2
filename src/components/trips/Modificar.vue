<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useRoute } from 'vue-router';
import { useTrip } from '../../composables/useTrip';

const { trip, getTrip, putTrip } = useTrip();

const visible = ref(true);
const route = useRoute();
const icon = ref('check');
const textButton = ref('');

const modificar = async () => {
	await putTrip(trip.value);
};

onMounted(async () => {
	await getTrip(+route.params.id);
	tipoBoton();
});

const verPdf = async (id: number) => {
	router.push({ path: `/pdf-trip/pdf/${id}` });
};

const tipoBoton = () => {
	switch (trip.value.estatus) {
		case 'CREADO':
			textButton.value = 'Programar';
			icon.value = 'warehouse';
			break;
		case 'PROGRAMADO':
			textButton.value = 'Transito';
			icon.value = 'truck-fast';
			break;
		case 'TRANSITO':
			textButton.value = 'Terminar';
			icon.value = 'flag';
			break;
	}
};
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Trip"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario @submit.prevent="modificar()" id="formulario" />
		<template #footer>
			<ButtonGroup>
				<!-- <Button
					icon="pi pi-times"
					label="Cancelar"
					@click="visible = false"
					severity="danger"
				/> -->
				<Button
					icon="pi pi-file-pdf"
					label="PDF"
					severity="info"
					@click="verPdf(trip.id)"
					v-if="trip.estatus !== 'CREADO'"
				></Button>
				<Button
					:icon="`fa fa-${icon}`"
					:label="textButton"
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

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useRoute } from 'vue-router';
import { useTrip } from '../../composables/useTrip';

const { trip, getTrip, putTrip } = useTrip();

const visible = ref(true);
const route = useRoute();

const modificar = async () => {
	await putTrip(trip.value);
};

onMounted(async () => {
	await getTrip(+route.params.id);
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
		:style="{ width: '40vw' }"
		v-on:after-hide="cerrarVentanaTrip()"
	>
		<Formulario @submit.prevent="modificar()" id="formulario" />
		<template #footer>
			<Button
				label="Cerrar ventana"
				icon="pi pi-times"
				@click="visible = false"
				outlined
				severity="danger"
			/>
			<Button
				:label="'Guardar'"
				icon="pi pi-check"
				type="submit"
				form="formulario"
				severity="success"
				v-if="trip.estatus !== 'TERMINADO'"
			/>
		</template>
	</Dialog>
	<router-view></router-view>
</template>

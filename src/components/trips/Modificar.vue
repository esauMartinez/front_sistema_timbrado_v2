<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useRoute } from 'vue-router';
import { useTrip } from "../../composables/useTrip";

const { trip, getTrip, putTrip } = useTrip();

const visible = ref(true);
const route = useRoute();

const modificar = async () => {
	await putTrip(trip.value);
	router.go(-1);
};

onMounted(async () => {
	await getTrip(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Modificar Trip"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario @submit.prevent="modificar()" id="formulario" />
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

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useTrip } from '../../composables/useTrip';

const { trip, postTrip, resetTripForm } = useTrip();

const visible = ref(true);

onMounted(() => {
	resetTripForm();
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Agregar trip"
		:style="{ width: '80vw' }"
		maximizable
		v-on:after-hide="router.go(-1)"
	>
		<Formulario @submit.prevent="postTrip(trip)" id="formulario" />
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

	<router-view></router-view>
</template>

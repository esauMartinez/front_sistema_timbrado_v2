<script lang="ts" setup>
import { ref } from 'vue';
import Formulario from './Formulario.vue'
import { router } from "../../../../router";
import { useTrip } from "../../../../composables/useTrip";

const { mercancia, agregarMercancia } = useTrip();
const visible = ref(true);

</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Agregar mercancia"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario @submit.prevent="agregarMercancia(mercancia)" id="formulario-mercancia" />
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


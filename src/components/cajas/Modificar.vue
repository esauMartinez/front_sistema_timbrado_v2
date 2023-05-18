<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useRoute } from 'vue-router';
import { useCaja } from '../../composables/useCaja';

const visible = ref(true);
const { unidad, putUnidad, getUnidad } = useCaja();
const route = useRoute();

const modificar = async () => {
	const response = await putUnidad(unidad.value);
	if (response) {
		router.go(-1);
	}
};

onMounted(async () => {
	await getUnidad(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Modificar caja"
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
				label="Modificar"
				icon="pi pi-pencil"
				type="submit"
				form="formulario"
				severity="warning"
			/>
		</template>
	</Dialog>
</template>

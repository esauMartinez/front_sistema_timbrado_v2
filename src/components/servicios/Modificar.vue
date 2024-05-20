<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useServicio } from '../../composables/useServicio';
import { useRoute } from 'vue-router';

const { servicio, getServicio, putServicio } = useServicio();

const visible = ref(true);
const route = useRoute();

const modificar = async () => {
	const response = await putServicio(servicio.value);
	if (response) {
		router.go(-1);
	}
};

onMounted(async () => {
	await getServicio(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Modificar servicio"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario @submit.prevent="modificar()" id="formulario" />
		<template #footer>
			<ButtonGroup>
				<!-- <Button
					label="Cancelar"
					icon="pi pi-times"
					@click="visible = false"
					severity="danger"
				/> -->
				<Button
					label="Guardar"
					icon="pi pi-check"
					type="submit"
					form="formulario"
					severity="success"
				/>
			</ButtonGroup>
		</template>
	</Dialog>
</template>

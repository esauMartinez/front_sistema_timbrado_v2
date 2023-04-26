<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import { useRoute } from 'vue-router';
import Formulario from './Formulario.vue';
import { useCliente } from '../../composables/useCliente';

const { cliente, getCliente, putCliente } = useCliente();
const visible = ref(true);
const route = useRoute();

const modificar = async () => {
	await putCliente(cliente.value);
	router.go(-1);
}

onMounted(async () => {
	await getCliente(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Modificar cliente"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario @submit.prevent="modificar()" id="formulario" />
		<template #footer>
			<Button
				label="Cancelar"
				icon="pi pi-times"
				@click="visible = false"
				severity="danger"
				outlined
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
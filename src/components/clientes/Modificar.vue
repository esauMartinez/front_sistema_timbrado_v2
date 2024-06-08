<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '@/router';
import { useRoute } from 'vue-router';
import Formulario from './Formulario.vue';
import { useCliente } from '@/composables/useCliente';

const { cliente, getCliente, putCliente } = useCliente();
const visible = ref(true);
const route = useRoute();

const modificar = async () => {
	const response = await putCliente(cliente.value, true);
	if (response) {
		router.go(-1);
	}
};

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
			<ButtonGroup>
				<Button
					label="Modificar"
					icon="pi pi-pencil"
					type="submit"
					form="formulario"
					severity="warning"
				/>
			</ButtonGroup>
		</template>
	</Dialog>
</template>

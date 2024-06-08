<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '@/router';
import Formulario from './Formulario.vue';
import { useRoute } from 'vue-router';
import { useOperador } from '@/composables/useOperador';

const visible = ref(true);
const { operador, putOperador, getOperador } = useOperador();
const route = useRoute();

const modificar = async () => {
	const response = await putOperador(operador.value);
	if (response) {
		router.go(-1);
	}
};

onMounted(async () => {
	await getOperador(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Modificar operador"
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

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useOperador } from '../../composables/useOperador';

const { operador, postOperador, resetOperadorForm } = useOperador();

const visible = ref(true);

onMounted(() => {
  resetOperadorForm();
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Agregar operador"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario @submit.prevent="postOperador(operador)" id="formulario" />
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


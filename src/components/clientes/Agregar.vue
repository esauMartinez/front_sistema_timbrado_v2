<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useCliente } from "../../composables/useCliente";

const visible = ref(true);

const { cliente, postCliente, resetClienteForm } = useCliente();

onMounted(() => {
	resetClienteForm();
});
</script>
<template>
	<div>
		<Dialog
			v-model:visible="visible"
			modal
			header="Agregar cliente"
			:style="{ width: '50vw' }"
			v-on:after-hide="router.go(-1)"
		>
			<!-- {{ usuario }} -->
			<Formulario @submit.prevent="postCliente(cliente)" id="formulario" />
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
	</div>
</template>

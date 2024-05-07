<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useCliente } from '../../composables/useCliente';

const { cliente, postCliente, resetClienteForm } = useCliente();
const visible = ref(true);

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
			:closable="false"
		>
			<Formulario @submit.prevent="postCliente(cliente)" id="formulario" />

			<template #footer>
				<ButtonGroup>
					<Button
						label="Cancelar"
						icon="pi pi-times"
						@click="visible = false"
						severity="danger"
					/>
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
	</div>
</template>

<style scoped>
.is-invalid {
	border-color: #b02a37;
}
</style>

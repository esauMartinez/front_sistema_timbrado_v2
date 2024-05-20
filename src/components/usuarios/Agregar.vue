<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useUsuario } from '../../composables/useUsuario';

const { usuario, postUsuario, resetUsuarioForm } = useUsuario();

const visible = ref(true);

onMounted(() => {
	resetUsuarioForm();
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Agregar usuario"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario
			@submit.prevent="postUsuario(usuario)"
			id="formulario"
			:isModule="true"
		/>
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

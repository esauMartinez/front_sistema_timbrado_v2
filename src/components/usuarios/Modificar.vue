<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useUsuario } from '../../composables/useUsuario';
import { useRoute } from 'vue-router';

const visible = ref(true);
const { usuario, putUsuario, getUsuario } = useUsuario();
const route = useRoute();

const modificar = async () => {
	const response = await putUsuario(usuario.value);
	if (response) {
		router.go(-1);
	}
};

onMounted(async () => {
	await getUsuario(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Modificar usuario"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario @submit.prevent="modificar()" id="formulario" :isModule="true" />
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

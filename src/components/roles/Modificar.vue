<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Formulario from './Formulario.vue';
import { useRol } from '@/composables/useRol';
import { router } from '@/router';
import { useRoute } from 'vue-router';

const { getRol, getModulos, putRol } = useRol();
const visible = ref(true);
const route = useRoute();

onMounted(async () => {
	await getModulos();
	await getRol(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Agregar Rol"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<div class="row">
			<div class="col-lg-12 mt-1 div-formulario">
				<Formulario @submit.prevent="putRol" id="formulario" />
			</div>
		</div>
		<template #footer>
			<ButtonGroup>
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

<style scoped>
.div-formulario {
	position: sticky;
	top: 0;
	z-index: 1001;
}
</style>

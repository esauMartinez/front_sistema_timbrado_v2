<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ArbolDePermisos from './ArbolDePermisos.vue';
import Formulario from './Formulario.vue';
import { useRol } from '../../composables/useRol';
import { router } from '../../router';

const { postRol, selectedKey, nodes, resetRolForm } = useRol();
const visible = ref(true);

onMounted(() => {
	resetRolForm()
})
</script>

<template>
	<Dialog v-model:visible="visible" modal header="Agregar Rol" :style="{ width: '50vw' }" v-on:after-hide="router.go(-1)">
		<div class="row">
			<div class="col-lg-12 mt-1 div-formulario">
				<Formulario @submit.prevent="postRol(selectedKey, nodes)" id="formulario" />
			</div>
			<div class="col-lg-12 mt-1">
				<ArbolDePermisos />
			</div>
		</div>
		<template #footer>
			<Button label="Cancelar" icon="pi pi-times" @click="visible = false" outlined severity="danger" />
			<Button label="Guardar" icon="pi pi-check" type="submit" form="formulario" severity="success" />
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

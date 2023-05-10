<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../../../router';
import PatioForm from './Patio.vue';
import { usePatio } from '../../../../composables/usePatio';
import { Patio } from '../../../../interfaces/patio.model';

const { patio, patios, resetPatioForm } = usePatio();
const visible = ref(true);

const agregarMovimiento = (patio: Patio) => {
	console.log(patio);
};

onMounted(() => {
	resetPatioForm();
	patios.value = [];
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Selecciona patio"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<PatioForm />
		<template #footer>
			<Button
				label="Cancelar"
				icon="pi pi-times"
				@click="visible = false"
				outlined
				severity="danger"
			/>
			<Button
				label="Agregar"
				icon="pi pi-check"
				type="button"
				form="formulario"
				severity="success"
				@click="agregarMovimiento(patio)"
			/>
		</template>
	</Dialog>
</template>

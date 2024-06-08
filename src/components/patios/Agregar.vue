<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '@/router';
import Formulario from './Formulario.vue';
import { usePatio } from "@/composables/usePatio";

const { patio, postPatio, resetPatioForm } = usePatio();

const visible = ref(true);

onMounted(() => {
  resetPatioForm();
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Agregar patio"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario @submit.prevent="postPatio(patio)" id="formulario" />
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



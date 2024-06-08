<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '@/router';
import Formulario from './Formulario.vue';
import { usePatio } from '@/composables/usePatio';
import { useRoute } from 'vue-router';

const visible = ref(true);
const { patio, putPatio, getPatio } = usePatio();
const route = useRoute();

const modificar = async () => {
	const response = await putPatio(patio.value);
	if (response) {
		router.go(-1);
	}
};

onMounted(async () => {
	await getPatio(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Modificar patio"
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
					v-if="route.params.type === 'update'"
				/>
			</ButtonGroup>
		</template>
	</Dialog>
</template>

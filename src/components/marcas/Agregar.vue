<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useTractor } from '../../composables/useTractor';
import { Marca } from '../../interfaces/marca.model';
import { useCaja } from '../../composables/useCaja';
import { string } from 'yup';
import { useRoute } from 'vue-router';
import { useMarca } from '../../composables/useMarca';

const visible = ref(true);
const route = useRoute();

const { marca, postMarca, resetMarcaForm } = useMarca();

let tipo = ref<string>('tractor');

onMounted(() => {
	resetMarcaForm();
	tipo.value = route.params.tipo.toString();
	marca.value.tipo = route.params.tipo.toString();
});


</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Agregar marca"
		:style="{ width: '30vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario
			@submit.prevent="postMarca(marca)"
			id="formulario-marca"
			:tipo="tipo"
		/>
		<template #footer>
			<ButtonGroup>
				<Button
					label="Guardar"
					icon="pi pi-check"
					type="submit"
					form="formulario-marca"
					severity="success"
				/>
			</ButtonGroup>
		</template>
	</Dialog>
</template>

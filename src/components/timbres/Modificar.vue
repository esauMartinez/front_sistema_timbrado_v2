<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useRoute } from 'vue-router';
import { useTimbrado } from '../../composables/useTimbrado';

const { getDatosTimbre } = useTimbrado();

const visible = ref(true);
const route = useRoute();

onMounted(async () => {
	await getDatosTimbre(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Datos del timbre"
		:style="{ width: '80vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario />
		<template #footer> </template>
	</Dialog>
</template>

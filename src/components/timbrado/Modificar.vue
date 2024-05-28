<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import Formulario from './Formulario.vue';
import { useRoute } from 'vue-router';
import { useTimbrado } from '../../composables/useTimbrado';
import { useAuth } from '../../composables/useAuth';

const { trip, getDatosTimbre, timbrar, isTimbrando, xmlTimbre } = useTimbrado();
const { getPermiso } = useAuth();
const route = useRoute();
const visible = ref(true);

onMounted(async () => {
	await getDatosTimbre(+route.params.id);
});

const verPdf = async (id: number) => {
	router.push({ path: `/pdf-timbre/pdf/${id}` });
};
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
		<template #footer>
			<ButtonGroup>
				<Button
					label="XML"
					icon="fa fa-file-code"
					severity="info"
					@click="xmlTimbre(trip.id)"
					v-if="trip.isTimbrado"
				/>
				<Button
					label="PDF"
					icon="pi pi-file-pdf"
					severity="info"
					@click="verPdf(trip.id)"
					v-if="trip.isTimbrado"
				/>
				<Button
					label="Timbrar"
					icon="pi pi-bell"
					severity="success"
					@click="timbrar(trip.id)"
					v-if="!getPermiso('MODULO_TIMBRADO_TIMBRAR')"
				/>
			</ButtonGroup>
		</template>
	</Dialog>
	<router-view></router-view>
</template>

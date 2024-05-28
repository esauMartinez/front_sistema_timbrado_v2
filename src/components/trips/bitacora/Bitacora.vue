<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { router } from '../../../router';
import { useTrip } from '../../../composables/useTrip';

const { trips } = useTrip();
const visible = ref(true);
const route = useRoute();
const bitacora: any = ref([]);

onMounted(() => {
	const findTrip: any = trips.value.find((x) => +x.id === +route.params.id);
	console.log(findTrip)
	bitacora.value.push({
		evento: 'CREO',
		usuario:
			findTrip.usuarioCreo === null
				? null
				: `${findTrip.usuarioCreo?.nombre} ${findTrip.usuarioCreo?.paterno} ${findTrip.usuarioCreo?.materno}`,
	});
	bitacora.value.push({
		evento: 'PROGRAMO',
		usuario:
			findTrip.usuarioPrograma === null
				? null
				: `${findTrip.usuarioPrograma?.nombre} ${findTrip.usuarioPrograma?.paterno} ${findTrip.usuarioPrograma?.materno}`,
	});
	bitacora.value.push({
		evento: 'TRANSITO',
		usuario:
			findTrip.usuarioTransito === null
				? null
				: `${findTrip.usuarioTransito?.nombre} ${findTrip.usuarioTransito?.paterno} ${findTrip.usuarioTransito?.materno}`,
	});
	bitacora.value.push({
		evento: 'TERMINO',
		usuario:
			findTrip.usuarioTermina === null
				? null
				: `${findTrip.usuarioTermina?.nombre} ${findTrip.usuarioTermina?.paterno} ${findTrip.usuarioTermina?.materno}`,
	});
	bitacora.value.push({
		evento: 'CANCELO',
		usuario:
			findTrip.usuarioCancelo === null
				? null
				: `${findTrip.usuarioCancelo?.nombre} ${findTrip.usuarioCancelo?.paterno} ${findTrip.usuarioCancelo?.materno}`,
	});
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Bitacora"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<DataTable :value="bitacora" showGridlines stripedRows>
			<Column field="evento" header="Evento"></Column>
			<Column field="usuario" header="Usuario">
				<template #body="{ data }">
					<p :class="{ 'text-red-500': data.usuario === null }">
						{{
							data.usuario === null
								? 'No hay registro de usuario'
								: data.usuario
						}}
					</p>
				</template>
			</Column>
		</DataTable>
	</Dialog>
</template>

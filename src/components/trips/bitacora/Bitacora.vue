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
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Bitacora"
		:style="{ width: '50vw' }"
		:position="'bottomleft'"
		v-on:after-hide="router.go(-1)"
	>
		<Timeline :value="bitacora" align="right">
			<template #content="slotProps">
				{{ slotProps.item.evento }}
				<p :class="{ 'text-danger': slotProps.item.usuario === null }">
					{{
						slotProps.item.usuario === null
							? 'No hay registro de usuario'
							: slotProps.item.usuario
					}}
				</p>
			</template>
		</Timeline>
	</Dialog>
</template>

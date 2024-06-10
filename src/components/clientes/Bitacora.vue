<script lang="ts" setup>
import { ref } from 'vue';
import { router } from '@/router';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useCliente } from '@/composables/useCliente';
import { formatDateWithTime } from '@/pipes/formatDate';
const visible = ref(true);

const { bitacora, getBitacoraCliente } = useCliente();
const route = useRoute();

onMounted(() => {
	getBitacoraCliente(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Bitacora cliente"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<div v-if="bitacora.length == 0">
			<h2 class="text-center">No hay historial de este cliente</h2>
		</div>
		<DataTable :value="bitacora" showGridlines stripedRows v-else>
			<Column field="evento" header="Evento"></Column>
			<Column field="comentarios" header="Comentarios"></Column>
			<Column header="fecha">
				<template #body="{ data }">
					{{ formatDateWithTime(data.createdAt) }}
				</template>
			</Column>
		</DataTable>
	</Dialog>
</template>

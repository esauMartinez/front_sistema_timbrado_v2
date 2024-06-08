<script setup lang="ts">
import { useCaja } from '@/composables/useCaja';
import { formatDateWithTime } from '@/pipes/formatDate';
import { router } from '@/router';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const { bitacora_caja, getUbicacionesCaja } = useCaja();
const route = useRoute();
const visible = ref(true);

onMounted(async () => {
	await getUbicacionesCaja(route.params.numero_economico.toString());
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Bitacora caja"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<DataTable :value="bitacora_caja" showGridlines stripedRows>
			<Column field="numero_trip" header="Trip"></Column>
			<Column field="patio" header="Patio"></Column>
			<Column field="numero_economico" header="Numero economico"></Column>
		</DataTable>
	</Dialog>
</template>

<style scoped></style>

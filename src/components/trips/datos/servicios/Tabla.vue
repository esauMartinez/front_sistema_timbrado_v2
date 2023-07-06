<script lang="ts" setup>
import { FilterMatchMode } from 'primevue/api';
import { onMounted, ref } from 'vue';

onMounted(() => {});

const servicios = [
	{
		nombre: 'test',
	},
];

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
</script>

<template>
	<DataTable
		v-model:filters="filters"
		:value="servicios"
		showGridlines
		stripedRows
		:class="[{ 'p-datatable-sm': true }]"
		dataKey="id"
	>
		<template #header>
			<div class="d-flex flex-wrap align-items-center justify-content-end">
				<div>
					<Button
						icon="pi pi-plus"
						severity="success"
					/>
				</div>
			</div>
		</template>
		<Column field="nombre" header="Nombre"></Column>
	</DataTable>
</template>

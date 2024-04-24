<script lang="ts" setup>
import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue';
import { router } from '../../../router';
import { useTimbrado } from '../../../composables/useTimbrado';
const { conceptos, eliminarConcepto } = useTimbrado();

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const agregarServicio = () => {
	router.push({ name: 'TimbreAgregarServicio' });
};
</script>

<template>
	<DataTable
		v-model:filters="filters"
		showGridlines
		:value="conceptos"
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
						@click="agregarServicio()"
					/>
				</div>
			</div>
		</template>
		<Column field="clave" header="Clave"></Column>
		<Column field="nombre" header="Descripcion"></Column>
		<Column field="monto" header="Monto"></Column>
		<Column field="iva" header="IVA"></Column>
		<Column field="retencion" header="Retencion"></Column>
		<Column>
			<template #body="{ data }">
				<div class="d-flex justify-content-center">
					<Button
						icon="pi pi-trash"
						severity="danger"
						@click="eliminarConcepto(data.id)"
					/>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

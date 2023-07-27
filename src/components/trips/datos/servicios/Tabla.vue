<script lang="ts" setup>
import { FilterMatchMode } from 'primevue/api';
import { onMounted, ref } from 'vue';
import { router } from '../../../../router';
import { useTrip } from '../../../../composables/useTrip';

const { trip, conceptos, eliminarConceptoTrip } = useTrip();

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const agregarServicio = () => {
	router.push({ name: 'AgregarServicioTrip' });
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
		<template #header v-if="trip.estatus === 'CREADO'">
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
		<Column v-if="trip.estatus === 'CREADO'">
			<template #body="{ data }">
				<div class="d-flex justify-content-center">
					<Button
						icon="pi pi-trash"
						severity="danger"
						@click="eliminarConceptoTrip(data.id)"
					/>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

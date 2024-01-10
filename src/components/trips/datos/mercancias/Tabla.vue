<script lang="ts" setup>
import { FilterMatchMode } from 'primevue/api';
import { onMounted, ref } from 'vue';
import { router } from '../../../../router';
import { useTrip } from '../../../../composables/useTrip';

const { trip, mercancias } = useTrip();

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const agregarMercancia = () => {
	router.push({ name: 'AgregarMercanciaTrip' });
};
</script>

<template>
	<Panel :header="'Mercancias'">
		<div
			class="col-lg-12"
			v-if="trip.estatus === 'CREADO'"
		>
			<DataTable
				v-model:filters="filters"
				showGridlines
				:value="mercancias"
				stripedRows
				:class="[{ 'p-datatable-sm': true }]"
			>
				<template #header v-if="trip.estatus === 'CREADO'">
					<div class="d-flex flex-wrap align-items-center justify-content-end">
						<div>
							<Button
								icon="pi pi-plus"
								severity="success"
								@click="agregarMercancia()"
							/>
						</div>
					</div>
				</template>
				<Column field="profucto" header="Producto"></Column>
				<Column field="clave_profucto" header="Clave Producto"></Column>
				<Column v-if="trip.estatus === 'CREADO'">
					<template #body="{ data }">
						<div class="d-flex justify-content-center">
							<Button icon="pi pi-trash" severity="danger" />
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
	</Panel>
</template>

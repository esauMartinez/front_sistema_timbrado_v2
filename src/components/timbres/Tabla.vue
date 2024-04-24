<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTrip } from '../../composables/useTrip';
import { FilterMatchMode } from 'primevue/api';
import { formatDateWithTime } from '../../pipes/formatDate';
import { severityTrip } from '../../pipes/severity';
import { router } from '../../router';

const { trips, getTrips } = useTrip();

onMounted(() => {
	getTrips();
});

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	razon_social: { value: null, matchMode: FilterMatchMode.CONTAINS },
	operador: { value: null, matchMode: FilterMatchMode.CONTAINS },
	paterno: { value: null, matchMode: FilterMatchMode.CONTAINS },
	materno: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const timbre = (id) => {
	router.push({ path: `/timbrar-trip/${id}` });
};
</script>

<template>
	<div>
		<DataTable
			v-model:filters="filters"
			:value="trips"
			showGridlines
			stripedRows
			paginator
			:rows="10"
			:rowsPerPageOptions="[10, 50, 100]"
			:class="[{ 'p-datatable-sm': true }]"
			dataKey="id"
			:loading="false"
			:globalFilterFields="[
				'numero_trip',
				'cliente.razon_social',
				'operador.nombre',
				'operador.paterno',
				'operador.materno',
			]"
		>
			<Column header="Trip">
				<template #body="data"> TRIP-{{ data.data.numero_trip }} </template>
			</Column>
			<Column header="Fecha de creacion">
				<template #body="data">
					{{ formatDateWithTime(data.data.createdAt) }}
				</template>
			</Column>
			<Column field="cliente.razon_social" header="Cliente"></Column>
			<Column header="Estatus">
				<template #body="{ data }">
					<Tag
						:severity="severityTrip(data.estatus)"
						:value="data.estatus"
						class="w-100"
					></Tag>
				</template>
			</Column>
			<Column header="">
				<template #body="{ data }">
					<div class="d-flex justify-content-center">
						<Button
							icon="pi pi-bell"
							severity="success"
							@click="timbre(data.id)"
						/>
					</div>
				</template>
			</Column>
		</DataTable>
	</div>
</template>

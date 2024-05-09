<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTrip } from '../../composables/useTrip';
import { FilterMatchMode } from 'primevue/api';
import { formatDateWithTime } from '../../pipes/formatDate';
import { severityTrip } from '../../pipes/severity';
import { router } from '../../router';
import { useAuth } from '../../composables/useAuth';
import { useTimbrado } from '../../composables/useTimbrado';

const { trips } = useTrip();
const { getTripsTimbrado } = useTimbrado();
const { getPermiso } = useAuth();

onMounted(() => {
	getTripsTimbrado();
});

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	razon_social: { value: null, matchMode: FilterMatchMode.CONTAINS },
	tipo_viaje: { value: null, matchMode: FilterMatchMode.CONTAINS },
	estatus: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const timbre = (id) => {
	router.push({ path: `/timbrar-trip/${id}` });
};
</script>

<template>
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
			'tipo_viaje',
			'estatus',
		]"
	>
		<template #header>
			<div class="flex justify-content-between">
				<IconField iconPosition="left">
					<InputIcon>
						<i class="pi pi-search" />
					</InputIcon>
					<InputText v-model="filters['global'].value" placeholder="Buscar" />
				</IconField>
			</div>
		</template>
		<Column header="Trip">
			<template #body="data"> TRIP-{{ data.data.numero_trip }} </template>
		</Column>
		<Column header="Fecha de creacion">
			<template #body="data">
				{{ formatDateWithTime(data.data.createdAt) }}
			</template>
		</Column>
		<Column field="cliente.razon_social" header="Cliente"></Column>
		<Column header="Tipo de viaje">
			<template #body="{ data }">
				{{ data.tipo_viaje }}
			</template>
		</Column>
		<Column header="Estatus">
			<template #body="{ data }">
				<Tag :severity="severityTrip(data.estatus)" :value="data.estatus"></Tag>
			</template>
		</Column>
		<Column header="Acciones">
			<template #body="{ data }">
				<div
					class="flex justify-content-center"
					v-if="data.estatus !== 'CREADO'"
				>
					<Button
						icon="pi pi-bell"
						severity="success"
						@click="timbre(data.id)"
						v-if="!getPermiso('TIMBRADO', 'modificar')"
					/>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

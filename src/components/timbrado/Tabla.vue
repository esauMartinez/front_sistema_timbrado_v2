<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTrip } from '@/composables/useTrip';
import { FilterMatchMode } from 'primevue/api';
import { formatDateWithTime } from '@/pipes/formatDate';
import { severityTrip } from '@/pipes/severity';
import { router } from '@/router';
import { useAuth } from '@/composables/useAuth';
import { useTimbrado } from '@/composables/useTimbrado';
import Tabla from './timbres/Tabla.vue';

const { trips, from, to, getTrips } = useTrip();
const { getPermiso } = useAuth();
const { getAcuses } = useTimbrado();

onMounted(async () => {
	await getTrips('TODOS');
});

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	razon_social: { value: null, matchMode: FilterMatchMode.CONTAINS },
	tipo_viaje: { value: null, matchMode: FilterMatchMode.CONTAINS },
	estatus: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const expandedRows = ref({});

const timbre = (id) => {
	router.push({ path: `/timbrar-trip/${id}` });
};

const estatus = ref({ label: 'Todos', value: 'TODOS' });
const estatusOptions = ref([
	{ label: 'Creado', value: 'CREADO' },
	{ label: 'Programado', value: 'PROGRAMADO' },
	{ label: 'Transito', value: 'TRANSITO' },
	{ label: 'Terminado', value: 'TERMINADO' },
	{ label: 'Cancelados', value: 'CANCELADO' },
	{ label: 'Todos', value: 'TODOS' },
]);
const selectedTrip = ref();

const onRowExpand = async (event) => {
	expandedRows.value = {};
	expandedRows.value = { [event.data.id]: true };
	await getAcuses(event.data.id);
};
</script>

<template>
	<DataTable
		v-model:filters="filters"
		v-model:expandedRows="expandedRows"
		:value="trips"
		showGridlines
		v-model:selection="selectedTrip"
		@rowExpand="onRowExpand"
		paginator
		:rowHover="true"
		:rows="20"
		:rowsPerPageOptions="[20, 50, 100]"
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
			<div class="grid">
				<div class="col-3">
					<IconField iconPosition="left">
						<InputIcon>
							<i class="pi pi-search" />
						</InputIcon>
						<InputText
							v-model="filters['global'].value"
							placeholder="Buscar"
							class="w-full"
						/>
					</IconField>
				</div>
				<div class="col-3">
					<Calendar v-model="from" :manualInput="false" class="w-full" />
				</div>
				<div class="col-3">
					<Calendar v-model="to" :manualInput="false" class="w-full" />
				</div>
				<div class="col-3">
					<Dropdown
						v-model="estatus"
						:options="estatusOptions"
						optionLabel="label"
						placeholder="Estatus"
						@change="getTrips(estatus.value)"
						class="w-full"
					/>
				</div>
			</div>
		</template>
		<Column expander style="width: 5rem" />
		<Column field="numero_trip" header="Trip" sortable>
			<template #body="data"> TRIP-{{ data.data.numero_trip }} </template>
		</Column>
		<Column field="createdAt" header="Fecha de creacion" sortable>
			<template #body="data">
				{{ formatDateWithTime(data.data.createdAt) }}
			</template>
		</Column>
		<Column field="cliente.razon_social" header="Cliente" sortable></Column>
		<Column field="tipo_viaje" header="Tipo de viaje" sortable>
			<template #body="{ data }">
				{{ data.tipo_viaje }}
			</template>
		</Column>
		<Column
			field="isTimbrado"
			header="Etatus timbre"
			headerStyle="width:10rem"
			sortable
		>
			<template #body="{ data }">
				<Tag
					:severity="data.isTimbrado ? 'success' : 'danger'"
					:value="data.isTimbrado ? 'Trip timbrado' : 'Trip sin timbre'"
				></Tag>
			</template>
		</Column>
		<Column
			field="estatus"
			header="Estatus trip"
			headerStyle="width:4rem"
			sortable
		>
			<template #body="{ data }">
				<Tag :severity="severityTrip(data.estatus)" :value="data.estatus"></Tag>
			</template>
		</Column>
		<Column header="Acciones" style="min-width: 50px">
			<template #body="{ data }">
				<div
					class="flex justify-content-center"
					v-if="data.estatus !== 'CREADO' && data.estatus !== 'CANCELADO'"
				>
					<Button
						icon="pi pi-bell"
						severity="success"
						@click="timbre(data.id)"
						v-if="!getPermiso('MODULO_TIMBRADO_TIMBRAR')"
					/>
				</div>
			</template>
		</Column>
		<template #expansion="{ data }">
			<div class="p-1">
				<Tabla :trip="data.id" />
			</div>
		</template>
	</DataTable>
</template>

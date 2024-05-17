<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTrip } from '../../composables/useTrip';
import { FilterMatchMode } from 'primevue/api';
import { formatDateWithTime } from '../../pipes/formatDate';
import { severityTrip } from '../../pipes/severity';
import { router } from '../../router';
import { useAuth } from '../../composables/useAuth';
import { Timbre } from '../../interfaces/timbre.model';
import { useTimbrado } from '../../composables/useTimbrado';
import { useLoad } from '../../composables/useLoad';

const { trips, from, to, getTrips } = useTrip();
const { getPermiso } = useAuth();
const { cancelarTimbre } = useTimbrado();

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

const severityEstatus = (data: Timbre) => {
	return data.estatus === 'CANCELADO' ? 'danger' : 'success';
};

const size = ref({ label: 'Small', value: 'small' });

const estatus = ref({ label: 'Todos', value: 'TODOS' });
const estatusOptions = ref([
	{ label: 'Creado', value: 'CREADO' },
	{ label: 'Programado', value: 'PROGRAMADO' },
	{ label: 'Transito', value: 'TRANSITO' },
	{ label: 'Terminado', value: 'TERMINADO' },
	{ label: 'Todos', value: 'TODOS' },
]);
</script>

<template>
	<DataTable
		v-model:filters="filters"
		v-model:expandedRows="expandedRows"
		:value="trips"
		showGridlines
		stripedRows
		paginator
		:size="size.value"
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
				<div>
					<Calendar v-model="from" :manualInput="false" class="mr-2" />
					<Calendar v-model="to" :manualInput="false" />
				</div>
				<SelectButton
					v-model="estatus"
					:options="estatusOptions"
					optionLabel="label"
					dataKey="label"
					@click="getTrips(estatus.value)"
				/>
			</div>
		</template>
		<Column expander style="width: 5rem" />
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
		<Column header="Etatus timbre" headerStyle="width:10rem">
			<template #body="{ data }">
				<Tag
					:severity="data.isTimbrado ? 'success' : 'danger'"
					:value="data.isTimbrado ? 'Trip timbrado' : 'Trip sin timbre'"
				></Tag>
			</template>
		</Column>
		<Column header="Estatus trip" headerStyle="width:4rem">
			<template #body="{ data }">
				<Tag :severity="severityTrip(data.estatus)" :value="data.estatus"></Tag>
			</template>
		</Column>
		<Column header="Acciones" headerStyle="width:4rem">
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
		<template #expansion="slotProps">
			<div class="p-1">
				<DataTable :value="slotProps.data.timbres">
					<Column header="Fecha">
						<template #body="{ data }">
							{{ formatDateWithTime(data.fecha_timbrado) }}
						</template>
					</Column>
					<Column field="uuid" header="UUID"></Column>
					<Column field="idccp" header="IDCCP"></Column>
					<Column field="estatus" header="Estatus" headerStyle="width:4rem">
						<template #body="{ data }">
							<Tag
								:severity="severityEstatus(data)"
								:value="data.estatus"
							></Tag>
						</template>
					</Column>
					<Column headerStyle="width:4rem">
						<template #body="{ data }">
							<div class="flex justify-content-center">
								<Button
									icon="pi pi-times"
									severity="danger"
									@click="cancelarTimbre(data.id)"
									v-if="data.estatus === 'CREADO'"
								/>
							</div>
						</template>
					</Column>
				</DataTable>
			</div>
		</template>
	</DataTable>
</template>

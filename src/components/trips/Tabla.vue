<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import { severityTrip } from '../../pipes/severity';
import { FilterMatchMode } from 'primevue/api';
import { useTrip } from '../../composables/useTrip';
import { useToast } from 'primevue/usetoast';
import { formatDateWithTime } from '../../pipes/formatDate';
import { useAuth } from '../../composables/useAuth';
import Agregar from './Agregar.vue';

const { getPermiso } = useAuth();
const toast = useToast();
const { trips, estatusTrip, from, to, getTrips } = useTrip();
const loading = ref(false);

const modificar = (id: number) => {
	router.push({ path: `/modificar-trip/${id}` });
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	razon_social: { value: null, matchMode: FilterMatchMode.CONTAINS },
	operador: { value: null, matchMode: FilterMatchMode.CONTAINS },
	paterno: { value: null, matchMode: FilterMatchMode.CONTAINS },
	materno: { value: null, matchMode: FilterMatchMode.CONTAINS },
	estatus: { value: null, matchMode: FilterMatchMode.CONTAINS },
	tipo_viaje: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const showTemplate = () => {
	toast.add({
		severity: 'info',
		summary: 'Are you sure?',
		detail: 'Proceed to confirm',
		group: 'bc',
	});
};

const bitacora = (id: number) => {
	router.push({ path: `/bitacora-trip/${id}` });
};

const comentarios = (id: number) => {
	router.push({ path: `/comentarios-trip/${id}` });
};

onMounted(async () => {
	await getTrips(estatusTrip.value);
});

const estatus = ref({ label: 'Todos', value: 'TODOS' });
const estatusOptions = ref([
	{ label: 'Creado', value: 'CREADO' },
	{ label: 'Programado', value: 'PROGRAMADO' },
	{ label: 'Transito', value: 'TRANSITO' },
	{ label: 'Terminado', value: 'TERMINADO' },
	{ label: 'Cancelados', value: 'CANCELADO' },
	{ label: 'Todos', value: 'TODOS' },
]);
</script>

<template>
	<DataTable
		v-model:filters="filters"
		:value="trips"
		showGridlines
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
			'operador.nombre',
			'operador.paterno',
			'operador.materno',
			'estatus',
			'tipo_viaje',
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
				<div class="col-2">
					<Dropdown
						v-model="estatus"
						:options="estatusOptions"
						optionLabel="label"
						placeholder="Estatus"
						@change="getTrips(estatus.value)"
						class="w-full"
					/>

					<!-- <SelectButton
						v-model="estatus"
						:options="estatusOptions"
						optionLabel="label"
						dataKey="label"
						:unselectable="false"
						@click="getTrips(estatus.value)"
					/> -->
				</div>
				<div class="col-1">
					<Button
						@click="showTemplate"
						icon="pi pi-plus"
						class="w-full"
						v-if="!getPermiso('MODULO_TRIPS_CREAR')"
					/>
				</div>
			</div>
		</template>
		<Column field="numero_trip" header="Trip" sortable>
			<template #body="data"> TRIP-{{ data.data.numero_trip }} </template>
		</Column>
		<Column field="createdAt" header="Fecha de creacion" sortable>
			<template #body="data">
				{{ formatDateWithTime(data.data.createdAt) }}
			</template>
		</Column>
		<Column field="tipo_viaje" header="Tipo de viaje" sortable></Column>
		<Column field="moneda" header="Moneda" sortable></Column>
		<Column field="cliente.razon_social" header="Cliente" sortable></Column>
		<Column field="operador.nombre" header="Operador" sortable>
			<template #body="{ data }">
				<div v-if="data.operador !== null">
					{{ data.operador.nombre }} {{ data.operador.paterno }}
					{{ data.operador.materno }}
				</div>
			</template>
		</Column>
		<Column field="tractor.numero_economico" header="Tractor" sortable></Column>
		<Column field="caja.numero_economico" header="Caja" sortable></Column>
		<Column field="estatus" header="Estatus" sortable>
			<template #body="{ data }">
				<Tag :severity="severityTrip(data.estatus)" :value="data.estatus"></Tag>
			</template>
		</Column>
		<Column header="Acciones" style="min-width: 200px">
			<template #body="{ data }">
				<div class="flex justify-content-center">
					<ButtonGroup>
						<Button
							icon="pi pi-book"
							severity="info"
							@click="bitacora(data.id)"
							v-if="
								data.usuario_toma_id === null &&
								!getPermiso('MODULO_TRIPS_BITACORA')
							"
						/>
						<Button
							icon="fa fa-comment"
							severity="success"
							@click="comentarios(data.id)"
							v-if="
								data.usuario_toma_id === null &&
								!getPermiso('MODULO_TRIPS_COMENTARIOS_VER')
							"
						/>
						<Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
							v-if="
								data.usuario_toma_id === null &&
								!getPermiso('MODULO_TRIPS_MODIFICAR')
							"
						/>
					</ButtonGroup>
				</div>
			</template>
		</Column>
	</DataTable>

	<Agregar />
</template>

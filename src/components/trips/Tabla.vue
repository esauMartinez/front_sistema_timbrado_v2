<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import { severityTrip } from '../../pipes/severity';
import { FilterMatchMode } from 'primevue/api';
import { useTrip } from '../../composables/useTrip';
import { useToast } from 'primevue/usetoast';
import { formatDateWithTime } from '../../pipes/formatDate';
import { useAuth } from '../../composables/useAuth';

const { getPermiso } = useAuth();
const toast = useToast();
const { trips, estatusTrip, from, to, getTrips, postTrip } = useTrip();
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
});

const showTemplate = () => {
	toast.add({
		severity: 'info',
		summary: 'Are you sure?',
		detail: 'Proceed to confirm',
		group: 'bc',
	});
};

const onReject = () => {
	toast.removeGroup('bc');
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

// const rowStyle = ({ usuario_toma_id }) => {
// 	if (usuario_toma_id !== null) {
// 		return { background: '#979191' };
// 	}
// };

const estatus = ref({ label: 'Transito', value: 'TRANSITO' });
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
		:value="trips"
		showGridlines
		stripedRows
		lazy
		paginator
		:rows="10"
		:rowsPerPageOptions="[10, 50, 100]"
		:class="[{ 'p-datatable-sm': true }]"
		dataKey="id"
		:loading="loading"
		:globalFilterFields="[
			'numero_trip',
			'cliente.razon_social',
			'operador.nombre',
			'operador.paterno',
			'operador.materno',
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
					<Calendar v-model="from" :manualInput="false" class="mr-1" />
					<Calendar v-model="to" :manualInput="false" class="mr-3" />
				</div>
				<SelectButton
					v-model="estatus"
					:options="estatusOptions"
					optionLabel="label"
					dataKey="label"
					:unselectable="false"
					@click="getTrips(estatus.value)"
				/>
				<Button
					@click="showTemplate"
					icon="pi pi-plus"
					label="Nuevo"
					v-if="!getPermiso('TRIPS', 'crear')"
				/>
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
		<Column field="tipo_viaje" header="Tipo de viaje"></Column>
		<Column field="moneda" header="Moneda"></Column>
		<Column field="cliente.razon_social" header="Cliente"></Column>
		<Column header="Operador">
			<template #body="{ data }">
				<div v-if="data.operador !== null">
					{{ data.operador.nombre }} {{ data.operador.paterno }}
					{{ data.operador.materno }}
				</div>
			</template>
		</Column>
		<Column field="tractor.numero_economico" header="Tractor"></Column>
		<Column field="caja.numero_economico" header="Caja"></Column>
		<Column header="Estatus">
			<template #body="{ data }">
				<Tag :severity="severityTrip(data.estatus)" :value="data.estatus"></Tag>
			</template>
		</Column>
		<Column header="Acciones">
			<template #body="{ data }">
				<div class="flex justify-content-center">
					<ButtonGroup>
						<Button
							icon="pi pi-book"
							severity="info"
							@click="bitacora(data.id)"
						/>
						<Button
							icon="fa fa-comment"
							severity="success"
							@click="comentarios(data.id)"
						/>
						<Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
							v-if="
								data.usuario_toma_id === null &&
								!getPermiso('TRIPS', 'modificar')
							"
						/>
					</ButtonGroup>
				</div>
			</template>
		</Column>
	</DataTable>

	<Toast position="center" group="bc">
		<template #message="slotProps">
			<div class="flex flex-column align-items-center" style="flex: 1">
				<div class="text-center">
					<i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
					<div class="font-bold text-xl my-3">
						¿ Deseas generar un nuevo trip ?
					</div>
				</div>
				<div class="flex justify-content-center">
					<Button severity="success" label="Si" @click="postTrip()"></Button>
					<Button
						severity="danger"
						class="ml-3"
						label="No"
						@click="onReject()"
					></Button>
				</div>
			</div>
		</template>
	</Toast>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import { severityTrip } from '../../pipes/severity';
import { FilterMatchMode } from 'primevue/api';
import { useTrip } from '../../composables/useTrip';
import { useToast } from 'primevue/usetoast';
import { formatDateWithTime } from '../../pipes/formatDate';
const toast = useToast();
const { trips, getTrips, postTrip } = useTrip();

const loading = ref(true);

onMounted(async () => {
	await getTrips();
	loading.value = false;
});

const modificar = (id: number) => {
	router.push({ path: `/modificar-trip/${id}` });
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	razon_social: { value: null, matchMode: FilterMatchMode.CONTAINS },
	operador: { value: null, matchMode: FilterMatchMode.CONTAINS },
	paterno: { value: null, matchMode: FilterMatchMode.CONTAINS },
	materno: { value: null, matchMode: FilterMatchMode.CONTAINS },
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

const rowStyle = ({ usuario_toma_id }) => {
	if (usuario_toma_id !== null) {
		return { background: '#979191' };
	}
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
		:rowStyle="rowStyle"
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
		<template #header>
			<div class="d-flex flex-wrap align-items-center justify-content-between">
				<span class="text-xl text-900 font-bold">Trips</span>
				<div>
					<span class="p-input-icon-left me-3">
						<i class="pi pi-search" />
						<InputText v-model="filters['global'].value" placeholder="Buscar" />
					</span>
					<Button @click="showTemplate" icon="pi pi-plus" />
				</div>
			</div>
		</template>
		<Column field="numero_trip" header="Trip"></Column>
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
				<Tag
					:severity="severityTrip(data.estatus)"
					:value="data.estatus"
					class="w-100"
				></Tag>
			</template>
		</Column>
		<Column header="Bitacora">
			<template #body="{ data }">
				<div class="d-flex justify-content-center">
					<!-- <Button
						icon="pi pi-book"
						severity="info"
						@click="bitacora(data.id)"
					/> -->
					<button @click="bitacora(data.id)" class="opciones bitacora">Bitacora</button>
				</div>
			</template>
		</Column>
		<Column header="Acciones">
			<template #body="{ data }">
				<div class="d-flex justify-content-center">
					<span class="p-buttonset">
						<!-- <Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
							v-if="data.usuario_toma_id === null"
						/> -->
						<button @click="modificar(data.id)" class="opciones text-dark modificar" style="backgroundColor: surface-500">Modificar</button>
					</span>
				</div>
			</template>
		</Column>
	</DataTable>

	<Toast position="bottom-center" group="bc">
		<template #message="slotProps">
			<div class="flex flex-column align-items-center" style="flex: 1">
				<div class="text-center">
					<i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
					<div class="font-bold text-xl my-3">
						¿ Quieres crear unn nuevo trip ?
					</div>
				</div>
				<div class="d-flex justify-content-center gap-2">
					<Button severity="success" label="Si" @click="postTrip()"></Button>
					<Button severity="secondary" label="No" @click="onReject()"></Button>
				</div>
			</div>
		</template>
	</Toast>
</template>

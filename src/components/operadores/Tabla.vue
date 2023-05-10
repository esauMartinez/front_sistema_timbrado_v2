<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import { useOperador } from '../../composables/useOperador';
import { formatDate } from '../../pipes/formatDate';
import { severity } from '../../pipes/severity';
import { FilterMatchMode } from 'primevue/api';
import { useTrip } from '../../composables/useTrip';

const { operadores, getOperadores, putOperador, deleteOperador } =
	useOperador();
const { selectOperador } = useTrip();

const props = defineProps({
	isModule: Boolean,
});

const loading = ref(true);

onMounted(() => {
	getOperadores();
	loading.value = false;
});

const modificar = (id: number) => {
	router.push({ path: `/modificar-operador/${id}` });
};

const agregar = () => {
	router.push({ path: `/agregar-operador` });
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	paterno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	meterno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	estado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	licencia: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	vencimiento_licencia: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
</script>

<template>
	<DataTable
		v-model:filters="filters"
		:value="operadores"
		showGridlines
		stripedRows
		paginator
		:rows="10"
		:rowsPerPageOptions="[10, 50, 100]"
		:class="[{ 'p-datatable-sm': true }]"
		dataKey="id"
		:loading="false"
		:globalFilterFields="[
			'nombre',
			'paterno',
			'materno',
			'rfc',
			'estado',
			'licencia',
			'vencimiento_licencia',
		]"
	>
		<template #header>
			<div class="d-flex flex-wrap align-items-center justify-content-between">
				<span class="text-xl text-900 font-bold">Operadores</span>
				<div>
					<span class="p-input-icon-left me-3">
						<i class="pi pi-search" />
						<InputText v-model="filters['global'].value" placeholder="Buscar" />
					</span>
					<Button
						icon="pi pi-plus"
						severity="success"
						@click="agregar"
						v-if="isModule"
					/>
				</div>
			</div>
		</template>
		<Column field="nombre" header="Nombre" sortable>
			<template #body="{ data }">
				{{ data.nombre }} {{ data.paterno }} {{ data.materno }}
			</template>
		</Column>
		<Column field="rfc" header="RFC" sortable />
		<Column field="estado" header="Estado" sortable />
		<Column field="licencia" header="Licencia" sortable />
		<Column
			field="vencimiento_licencia"
			header="Vencimineto de la licencia"
			:sortable="true"
		>
			<template #body="{ data }">
				{{ formatDate(data.vencimiento_licencia) }}
			</template>
		</Column>
		<Column v-if="isModule">
			<template #body="{ data }">
				<InputSwitch v-model="data.estatus" @change="putOperador(data)" />
			</template>
		</Column>
		<Column header="Estatus">
			<template #body="{ data }">
				<Tag
					:severity="severity(data.estatus)"
					:value="data.estatus ? 'Activo' : 'Inactivo'"
				></Tag>
			</template>
		</Column>
		<Column header="Acciones">
			<template #body="{ data }">
				<div class="d-flex justify-content-center">
					<span class="p-buttonset">
						<Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
							v-if="isModule"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							@click="deleteOperador(data.id)"
							v-if="isModule"
						/>
						<Button
							icon="pi pi-plus"
							v-if="!isModule && data.estatus"
							@click="selectOperador(data)"
						/>
					</span>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

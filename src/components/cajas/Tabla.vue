<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import { formatDate } from '../../pipes/formatDate';
import { severity } from '../../pipes/severity';
import { useCaja } from '../../composables/useCaja';
import { FilterMatchMode } from 'primevue/api';
import { useTrip } from '../../composables/useTrip'

const { unidades, getUnidades, putUnidad, deleteUnidad } = useCaja();
const { selectCaja } = useTrip();

const loading = ref(true);
const props = defineProps({
	isModule: Boolean,
});

onMounted(() => {
	getUnidades();
	loading.value = true;
});

const modificar = (id: number) => {
	router.push({ path: `/modificar-caja/${id}` });
};

const agregar = () => {
	router.push({ path: `/agregar-caja` });
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	numero_economico: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	matricula: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	numero_poliza: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	vencimiento_poliza: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
</script>

<template>
	<DataTable
		v-model:filters="filters"
		:value="unidades"
		showGridlines
		stripedRows
		paginator
		:rows="10"
		:rowsPerPageOptions="[10, 50, 100]"
		:class="[{ 'p-datatable-sm': true }]"
		dataKey="id"
		:loading="false"
		:globalFilterFields="[
			'numero_economico',
			'matricula',
			'numero_poliza',
			'vencimiento_poliza',
		]"
	>
		<template #header>
			<div class="d-flex flex-wrap align-items-center justify-content-between">
				<span class="text-xl text-900 font-bold">Cajas</span>
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
		<Column header="Tipo de unidad">
			<template #body="{ data }">
				<div class="d-flex justify-content-center align-items-center">
					<Avatar image="/remolque.png" size="large" />
				</div>
			</template>
		</Column>
		<Column
			field="numero_economico"
			header="Numero economico"
			sortable
		></Column>
		<Column field="matricula" header="Matricula" sortable></Column>
		<Column field="numero_poliza" header="Numero de poliza" sortable></Column>
		<Column
			field="vencimiento_poliza"
			header="Vencimineto de la poliza"
			:sortable="true"
		>
			<template #body="{ data }">
				{{ formatDate(data.vencimiento_poliza) }}
			</template>
		</Column>

		<Column v-if="isModule">
			<template #body="{ data }">
				<InputSwitch v-model="data.estatus" @change="putUnidad(data)" />
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
							@click="deleteUnidad(data.id)"
							v-if="isModule"
						/>
						<Button
							icon="pi pi-plus"
							v-if="!isModule && data.estatus"
							@click="selectCaja(data)"
						/>
					</span>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

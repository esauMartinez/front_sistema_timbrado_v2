<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '@/router';
import { severity } from '@/pipes/severity';
import { useTractor } from '@/composables/useTractor';
import { FilterMatchMode } from 'primevue/api';
import { useTrip } from '@/composables/useTrip';
import { useAuth } from '@/composables/useAuth';

const { getPermiso } = useAuth();

const { unidades, getUnidades, putUnidad, deleteUnidad } = useTractor();
const { selectTractor } = useTrip();

const props = defineProps({
	isModule: Boolean,
});

const loading = ref(true);

onMounted(() => {
	getUnidades();
	loading.value = false;
});

const modificar = (id: number) => {
	router.push({ path: `/modificar-tractor/${id}` });
};

const agregar = () => {
	router.push({ path: `/agregar-tractor` });
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
			<div class="flex justify-content-between">
				<IconField iconPosition="left">
					<InputIcon>
						<i class="pi pi-search" />
					</InputIcon>
					<InputText v-model="filters['global'].value" placeholder="Buscar" />
				</IconField>
				<Button
					type="button"
					icon="pi pi-plus"
					label="Nuevo"
					outlined
					@click="agregar"
					v-if="isModule && !getPermiso('MODULO_TRACTORES_CREAR')"
				/>
			</div>
		</template>

		<Column header="Tipo de unidad">
			<template #body="{ data }">
				<div class="d-flex justify-content-center align-items-center">
					<Avatar image="/truck.png" size="large" />
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
		<Column header="Vencimineto de la poliza">
			<template #body="{ data }">
				{{ data.descripcion_vencimiento }}
			</template>
		</Column>

		<Column v-if="isModule">
			<template #body="{ data }">
				<InputSwitch
					v-model="data.estatus"
					@change="putUnidad(data)"
					v-if="!getPermiso('MODULO_TRACTORES_MODIFICAR')"
				/>
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
				<div class="flex justify-content-center">
					<ButtonGroup>
						<Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
							v-if="isModule && !getPermiso('MODULO_TRACTORES_MODIFICAR')"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							@click="deleteUnidad(data.id)"
							v-if="isModule && !getPermiso('MODULO_TRACTORES_ELIMINAR')"
						/>
						<Button
							icon="pi pi-plus"
							v-if="!isModule && data.estatus"
							@click="selectTractor(data)"
						/>
					</ButtonGroup>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

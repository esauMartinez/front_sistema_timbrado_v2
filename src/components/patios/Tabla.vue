<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '@/router';
import { usePatio } from '@/composables/usePatio';
import { severity } from '@/pipes/severity';
import { FilterMatchMode } from 'primevue/api';
import { useTrip } from '@/composables/useTrip';
import { useAuth } from '@/composables/useAuth';

const { getPermiso } = useAuth();

const { patios, getPatios, putPatio, deletePatio } = usePatio();
const { agregarMovimiento } = useTrip();

const props = defineProps({
	isModule: Boolean,
});

const loading = ref(true);

onMounted(() => {
	getPatios();
	loading.value = false;
});

const modificar = (id: number) => {
	router.push({ path: `/modificar-patio/${id}/update` });
};

const agregar = () => {
	router.push({ path: `/agregar-patio` });
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	codigo_postal: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	estado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	pais: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	tipo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
</script>

<template>
	<DataTable
		v-model:filters="filters"
		:value="patios"
		showGridlines
		stripedRows
		paginator
		:rows="10"
		:rowsPerPageOptions="[10, 50, 100]"
		:class="[{ 'p-datatable-sm': true }]"
		dataKey="id"
		:loading="false"
		:globalFilterFields="['nombre', 'codigo_postal', 'estado', 'pais', 'tipo']"
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
					v-if="isModule && !getPermiso('MODULO_PATIOS_CREAR')"
				/>
			</div>
		</template>
		<Column field="nombre" header="Nombre" sortable></Column>
		<Column field="codigo_postal" header="Codigo postal" sortable />
		<Column field="estado" header="Estado" sortable />
		<Column field="pais" header="Pais" sortable />
		<Column field="tipo" header="Tipo" sortable />
		<Column v-if="isModule">
			<template #body="{ data }">
				<InputSwitch
					v-model="data.estatus"
					@change="putPatio(data)"
					v-if="!getPermiso('MODULO_PATIOS_MODIFICAR')"
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
				<div class="flex justify-content-center" v-if="data.estatus">
					<ButtonGroup>
						<Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
							v-if="isModule && !getPermiso('MODULO_PATIOS_MODIFICAR')"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							@click="deletePatio(data.id)"
							v-if="isModule && !getPermiso('MODULO_PATIOS_ELIMINAR')"
						/>
						<Button
							icon="pi pi-plus"
							v-if="!isModule && data.estatus"
							@click="agregarMovimiento(data)"
						/>
					</ButtonGroup>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

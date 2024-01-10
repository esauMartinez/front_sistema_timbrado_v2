<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import { usePatio } from '../../composables/usePatio';
import { severity } from '../../pipes/severity';
import { FilterMatchMode } from 'primevue/api';
import { useTrip } from '../../composables/useTrip';
import { useAuth } from '../../composables/useAuth';

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
			<div class="d-flex flex-wrap align-items-center justify-content-between">
				<span class="text-xl text-900 font-bold">Patios</span>
				<div>
					<span class="p-input-icon-left me-3">
						<i class="pi pi-search" />
						<InputText v-model="filters['global'].value" placeholder="Buscar" />
					</span>
					<Button
						icon="pi pi-plus"
						severity="success"
						@click="agregar"
						v-if="isModule && !getPermiso('PATIOS', 'crear')"
					/>
				</div>
			</div>
		</template>
		<Column field="nombre" header="Nombre" sortable></Column>
		<Column field="codigo_postal" header="Codigo postal" sortable />
		<Column field="estado" header="Estado" sortable />
		<Column field="pais" header="Pais" sortable />
		<Column field="tipo" header="Tipo" sortable />
		<Column v-if="isModule">
			<template #body="{ data }">
				<InputSwitch v-model="data.estatus" @change="putPatio(data)" />
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
				<div class="d-flex justify-content-center" v-if="data.estatus">
					<span class="p-buttonset">
						<Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
							v-if="isModule && !getPermiso('PATIOS', 'modificar')"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							@click="deletePatio(data.id)"
							v-if="isModule && !getPermiso('PATIOS', 'eliminar')"
						/>
						<Button
							icon="pi pi-plus"
							v-if="!isModule && data.estatus"
							@click="agregarMovimiento(data)"
						/>
					</span>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

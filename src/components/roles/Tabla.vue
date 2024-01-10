<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import { FilterMatchMode } from 'primevue/api';
import { useRol } from '../../composables/useRol';
import { useAuth } from '../../composables/useAuth';

const { getPermiso } = useAuth();

const { roles, getRol, getRoles, deleteRol } = useRol();

const loading = ref(true);

onMounted(() => {
	getRoles();
	loading.value = false;
});

const modificar = (id: number) => {
	router.push({ path: `/modificar-rol/${id}` });
};

const agregar = () => {
	router.push({ path: `/agregar-rol` });
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
</script>

<template>
	<DataTable
		v-model:filters="filters"
		:value="roles"
		showGridlines
		stripedRows
		paginator
		:rows="10"
		:rowsPerPageOptions="[10, 50, 100]"
		:class="[{ 'p-datatable-sm': true }]"
		dataKey="id"
		:loading="false"
		:globalFilterFields="['nombre']"
	>
		<template #header>
			<div class="d-flex flex-wrap align-items-center justify-content-between">
				<span class="text-xl text-900 font-bold">Servicios</span>
				<div>
					<span class="p-input-icon-left me-3">
						<i class="pi pi-search" />
						<InputText v-model="filters['global'].value" placeholder="Buscar" />
					</span>
					<Button
						icon="pi pi-plus"
						severity="success"
						@click="agregar"
						v-if="!getPermiso('ROLES', 'crear')"
					/>
				</div>
			</div>
		</template>
		<Column field="nombre" header="Nombre" sortable></Column>
		<Column header="Acciones">
			<template #body="{ data }">
				<div class="d-flex justify-content-center">
					<span class="p-buttonset">
						<Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
							v-if="!getPermiso('ROLES', 'modificar')"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							@click="deleteRol(data.id)"
							v-if="!getPermiso('ROLES', 'eliminar')"
						/>
					</span>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

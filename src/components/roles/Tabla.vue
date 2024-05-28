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
			<div class="flex justify-content-between">
				<IconField iconPosition="left">
					<InputIcon>
						<i class="pi pi-search" />
					</InputIcon>
					<InputText v-model="filters['global'].value" placeholder="Buscar" />
				</IconField>
				<Button
					icon="pi pi-plus"
					severity="success"
					@click="agregar"
					v-if="!getPermiso('MODULO_ROLES_VER')"
				/>
			</div>
		</template>

		<Column field="nombre" header="Nombre" sortable></Column>
		<Column header="Acciones">
			<template #body="{ data }">
				<div class="flex justify-content-center">
					<ButtonGroup>
						<Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
							v-if="!getPermiso('MODULO_ROLES_MODIFICAR')"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							@click="deleteRol(data.id)"
							v-if="!getPermiso('MODULO_ROLES_ELIMINAR')"
						/>
					</ButtonGroup>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

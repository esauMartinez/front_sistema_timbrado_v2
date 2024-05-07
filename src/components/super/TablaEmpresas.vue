<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import { severity } from '../../pipes/severity';
import { FilterMatchMode } from 'primevue/api';
import { useEmpresa } from '../../composables/useEmpresa';

const { empresas, getEmpresas } = useEmpresa();

const loading = ref(true);

onMounted(() => {
	getEmpresas();
	loading.value = false;
});

const agregar = () => {
	router.push({ path: `/agregar-empresa` });
};

const verUsuariosEmpresa = async (id: number) => {
	router.push({ path: `/usuarios-empresa/${id}` });
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	razon_social: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	rfc: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
</script>

<template>
	<DataTable
		v-model:filters="filters"
		:value="empresas"
		showGridlines
		stripedRows
		paginator
		:rows="10"
		:rowsPerPageOptions="[10, 50, 100]"
		:class="[{ 'p-datatable-sm': true }]"
		dataKey="id"
		:loading="false"
		:globalFilterFields="['razon_social', 'rfc']"
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
				/>
			</div>
		</template>
		<Column field="uuid_sw" header="UUID" sortable></Column>
		<Column
			field="razon_social"
			header="Empresa / Razon social"
			sortable
		></Column>
		<Column field="rfc" header="RFC" sortable></Column>
		<Column field="codigo_postal" header="Codigo postal" sortable />
		<Column field="permiso_sct" header="Permiso sct" sortable />
		<Column field="numero_permiso_sct" header="Numero permiso sct" sortable />
		<Column
			field="clave_regimen_fiscal"
			header="Clave regimen fiscal"
			sortable
		/>
		<Column header="Estatus">
			<template #body="{ data }">
				<Tag
					:severity="severity(data.activo)"
					:value="data.activo ? 'Activo' : 'Inactivo'"
				></Tag>
			</template>
		</Column>
		<Column header="Acciones">
			<template #body="{ data }">
				<div class="d-flex justify-content-center">
					<span class="p-buttonset">
						<Button
							icon="pi pi-eye"
							severity="info"
							label="Usuarios"
							@click="verUsuariosEmpresa(data.id)"
						/>
					</span>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

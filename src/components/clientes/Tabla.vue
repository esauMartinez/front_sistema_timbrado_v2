<script lang="ts" setup>
import { onMounted, ref, defineProps } from 'vue';
import { useCliente } from '../../composables/useCliente';
import { router } from '../../router';
import { severity } from '../../pipes/severity';
import { FilterMatchMode } from 'primevue/api';
import { useTrip } from '../../composables/useTrip';
import { useAuth } from '../../composables/useAuth';

const { getPermiso } = useAuth();
const { clientes, getClientes, putCliente, deleteCliente } = useCliente();
const { selectCliente } = useTrip();

const loading = ref(true);

const props = defineProps({
	isModule: Boolean,
});

onMounted(() => {
	getClientes();
	loading.value = false;
});

const modificar = (id: number) => {
	router.push({ path: `/modificar-cliente/${id}` });
};

const agregar = () => {
	router.push({ path: `/agregar-cliente` });
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	razon_social: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	codigo_postal: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	uso_cfdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	estado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	pais: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
</script>

<template>
	<DataTable
		v-model:filters="filters"
		:value="clientes"
		showGridlines
		stripedRows
		paginator
		:rows="10"
		:rowsPerPageOptions="[10, 50, 100]"
		:class="[{ 'p-datatable-sm': true }]"
		dataKey="id"
		:loading="false"
		:globalFilterFields="[
			'razon_social',
			'codigo_postal',
			'uso_cfdi',
			'estado',
			'pais',
		]"
	>
		<template #header>
			<div class="d-flex flex-wrap align-items-center justify-content-between">
				<span class="text-xl text-900 font-bold">Clientes</span>
				<div>
					<span class="p-input-icon-left me-3">
						<i class="pi pi-search" />
						<InputText v-model="filters['global'].value" placeholder="Buscar" />
					</span>
					<Button
						icon="pi pi-plus"
						severity="success"
						@click="agregar"
						v-if="isModule && !getPermiso('CLIENTES', 'crear')"
					/>
				</div>
			</div>
		</template>
		<Column field="razon_social" header="Razon social" sortable></Column>
		<Column field="codigo_postal" header="Codigo Postal" sortable />
		<Column field="uso_cfdi" header="Uso de CFDI" sortable />
		<Column field="estado" header="Estado" sortable />
		<Column field="pais" header="Pais" sortable />
		<!-- <Column v-if="isModule">
			<template #body="{ data }">
				<InputSwitch v-model="data.estatus" @change="putCliente(data)" />
			</template>
		</Column> -->
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
							v-if="isModule && !getPermiso('CLIENTES', 'modificar')"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							@click="deleteCliente(data.id)"
							v-if="isModule && !getPermiso('CLIENTES', 'eliminar')"
						/>
						<Button
							icon="pi pi-plus"
							v-if="!isModule && data.estatus"
							@click="selectCliente(data)"
						/>
					</span>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

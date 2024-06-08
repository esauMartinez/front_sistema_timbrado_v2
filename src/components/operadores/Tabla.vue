<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '@/router';
import { useOperador } from '@/composables/useOperador';
import { severity } from '@/pipes/severity';
import { FilterMatchMode } from 'primevue/api';
import { useTrip } from '@/composables/useTrip';
import { useAuth } from '@/composables/useAuth';

const { getPermiso } = useAuth();
const { operadores, putOperador, deleteOperador } =
	useOperador();
const { selectOperador } = useTrip();

const props = defineProps({
	isModule: Boolean,
});

const loading = ref(true);

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
					v-if="isModule && !getPermiso('MODULO_OPERADORES_CREAR')"
				/>
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
		<Column header="Vencimineto de la licencia">
			<template #body="{ data }">
				{{ data.descripcion_vencimiento }}
			</template>
		</Column>
		<Column v-if="isModule">
			<template #body="{ data }">
				<InputSwitch
					v-model="data.estatus"
					@change="putOperador(data)"
					v-if="!getPermiso('MODULO_OPERADORES_MODIFICAR')"
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
							v-if="isModule && !getPermiso('MODULO_OPERADORES_MODIFICAR')"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							@click="deleteOperador(data.id)"
							v-if="isModule && !getPermiso('MODULO_OPERADORES_ELIMINAR')"
						/>
						<Button
							icon="pi pi-plus"
							v-if="!isModule && data.estatus"
							@click="selectOperador(data)"
						/>
					</ButtonGroup>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

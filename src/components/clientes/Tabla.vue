<script lang="ts" setup>
import { useCliente } from '@/composables/useCliente';
import { router } from '@/router/index';
import { severity } from '@/pipes/severity';
import { useTrip } from '@/composables/useTrip';
import { useAuth } from '@/composables/useAuth';
import { ref, defineProps } from 'vue';
import { FilterMatchMode } from 'primevue/api';

const { getPermiso } = useAuth();
const { clientes, getClientes, putCliente, deleteCliente } = useCliente();
const { selectCliente } = useTrip();

const loading = ref(true);

const props = defineProps({
	isModule: Boolean,
});

loading.value = false;

const modificar = (id: number) => {
	router.push({ path: `/modificar-cliente/${id}` });
};

const agregar = () => {
	router.push({ path: `/agregar-cliente` });
};

const bitacora = (id) => {
	router.push({ path: `/bitacora-cliente/${id}` });
};

const contactos = (id) => {
	router.push({ path: `/contactos-cliente/${id}` });
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
		paginator
		showGridlines
		stripedRows
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
					v-if="isModule && !getPermiso('MODULO_CLIENTES_CREAR')"
				/>
			</div>
		</template>

		<Column field="razon_social" header="Razon social" sortable></Column>
		<Column field="codigo_postal" header="Codigo Postal" sortable />
		<Column field="uso_cfdi" header="Uso de CFDI" sortable />
		<Column field="estado" header="Estado" sortable />
		<Column field="pais" header="Pais" sortable />
		<Column v-if="isModule">
			<template #body="{ data }">
				<InputSwitch
					v-model="data.estatus"
					@change="putCliente(data)"
					v-if="!getPermiso('MODULO_CLIENTES_MODIFICAR')"
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
		<Column header="Acciones" style="min-width: 200px">
			<template #body="{ data }">
				<div class="flex justify-content-center">
					<ButtonGroup>
						<Button
							icon="pi pi-book"
							@click="bitacora(data.id)"
							severity="info"
							v-if="isModule && !getPermiso('MODULO_CLIENTES_BITACORA')"
						/>
						<Button
							@click="contactos(data.id)"
							icon="pi pi-phone"
							severity="info"
							v-if="isModule && !getPermiso('MODULO_CLIENTES_CONTACTOS_VER')"
						/>
						<Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
							v-if="isModule && !getPermiso('MODULO_CLIENTES_MODIFICAR')"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							@click="deleteCliente(data.id)"
							v-if="isModule && !getPermiso('MODULO_CLIENTES_ELIMINAR')"
						/>
						<Button
							icon="pi pi-plus"
							v-if="!isModule && data.estatus"
							@click="selectCliente(data)"
						/>
					</ButtonGroup>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

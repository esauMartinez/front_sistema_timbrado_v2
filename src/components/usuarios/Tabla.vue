<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useUsuario } from '@/composables/useUsuario';
import { router } from '@/router';
import { useAuth } from '@/composables/useAuth';
import { severity } from '@/pipes/severity';
import { useEmpresa } from '@/composables/useEmpresa';

const { usuarios, getUsuarios, putUsuario, deleteUsuario } = useUsuario();
const { empresa } = useEmpresa();
const { compararUsuarioId, getPermiso } = useAuth();

const loading = ref(true);

const props = defineProps({
	isModule: Boolean,
});

onMounted(async () => {
	if (props.isModule) {
		await getUsuarios();
	}
	loading.value = false;
});

const modificar = (id: number) => {
	router.push({ path: `/modificar-usuario/${id}` });
};

const agregar = () => {
	router.push({ path: `/agregar-usuario` });
};

const agregarSuper = () => {
	router.push({ path: `/agregar-usuario-super/${empresa.value.id}` });
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	paterno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	meterno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
</script>

<template>
	<DataTable
		v-model:filters="filters"
		:value="usuarios"
		showGridlines
		stripedRows
		paginator
		:rows="10"
		:rowsPerPageOptions="[10, 50, 100]"
		:class="[{ 'p-datatable-sm': true }]"
		dataKey="id"
		:loading="false"
		:globalFilterFields="['nombre', 'paterno', 'materno']"
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
					label="Nuevo"
					severity="success"
					outlined
					@click="isModule ? agregar() : agregarSuper()"
					v-if="!getPermiso('MODULO_USUARIOS_CREAR')"
				/>
			</div>
		</template>
		<template #empty> No se encontraron datos. </template>
		<template #loading> Cargando usuarios, por favor espera. </template>
		<Column field="nombre" header="Nombre" :sortable="true">
			<template #body="{ data }">
				{{ data.nombre }} {{ data.paterno }} {{ data.materno }}
			</template>
		</Column>
		<Column field="email" header="Correo electrónico" sortable />
		<Column field="role.nombre" header="Rol"></Column>
		<Column v-if="isModule">
			<template #body="{ data }">
				<div
					class="d-flex justify-content-center"
					v-if="!compararUsuarioId(data.id)"
				>
					<InputSwitch v-model="data.activo" @change="putUsuario(data)" />
				</div>
			</template>
		</Column>
		<Column header="Estatus">
			<template #body="{ data }">
				<Tag
					:severity="severity(data.activo)"
					:value="data.activo ? 'Activo' : 'Inactivo'"
				></Tag>
			</template>
		</Column>
		<Column header="Acciones" v-if="isModule">
			<template #body="{ data }">
				<div class="flex justify-content-center">
					<ButtonGroup>
						<Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
							v-if="!getPermiso('MODULO_USUARIOS_MODIFICAR')"
						/>
						<Button
							icon="pi pi-trash"
							severity="danger"
							@click="deleteUsuario(data.id)"
							v-if="!getPermiso('MODULO_USUARIOS_ELIMINAR')"
						/>
					</ButtonGroup>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

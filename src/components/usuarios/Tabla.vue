<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useUsuario } from '../../composables/useUsuario';
import { router } from '../../router';
import { useAuth } from '../../composables/useAuth';
import { severity } from '../../pipes/severity';
const { usuarios, getUsuarios, putUsuario, rolFormateado, deleteUsuario } =
	useUsuario();
const { compararUsuarioId } = useAuth();

const loading = ref(true);

onMounted(async () => {
	await getUsuarios();
	loading.value = false;
});

const modificar = (id: number) => {
	router.push({ path: `/modificar-usuario/${id}` });
};

const agregar = () => {
	router.push({ path: `/agregar-usuario` });
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	paterno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	meterno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
</script>

<template>
	<Card>
		<template #content>
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
					<div
						class="d-flex flex-wrap align-items-center justify-content-between"
					>
						<span class="text-xl text-900 font-bold">Usuarios</span>
						<div>
							<span class="p-input-icon-left me-3">
								<i class="pi pi-search" />
								<InputText
									v-model="filters['global'].value"
									placeholder="Buscar"
								/>
							</span>
							<Button icon="pi pi-plus" severity="success" @click="agregar" />
						</div>
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
				<Column field="role.nombre" header="Tipo de usuario" sortable>
					<template #body="{ data }">
						{{ rolFormateado(data.role.nombre) }}
					</template>
				</Column>
				<Column>
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
				<Column header="Acciones">
					<template #body="{ data }">
						<div class="d-flex justify-content-center">
							<span class="p-buttonset">
								<Button
									icon="pi pi-pencil"
									severity="warning"
									@click="modificar(data.id)"
								/>
								<Button
									icon="pi pi-trash"
									severity="danger"
									@click="deleteUsuario(data.id)"
								/>
							</span>
						</div>
					</template>
				</Column>
			</DataTable>
		</template>
	</Card>
</template>

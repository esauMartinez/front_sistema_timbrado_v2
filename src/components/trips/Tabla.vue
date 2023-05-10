<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '../../router';
import { severity } from '../../pipes/severity';
import { FilterMatchMode } from 'primevue/api';
import { useTrip } from '../../composables/useTrip';

const { trips, getTrips } = useTrip();

const loading = ref(true);

onMounted(() => {
	getTrips();
	loading.value = false;
});

const modificar = (id: number) => {
	router.push({ path: `/modificar-trip/${id}` });
};

const agregar = () => {
	router.push({ path: `/agregar-trip` });
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
	<DataTable
		v-model:filters="filters"
		:value="trips"
		showGridlines
		stripedRows
		paginator
		:rows="10"
		:rowsPerPageOptions="[10, 50, 100]"
		:class="[{ 'p-datatable-sm': true }]"
		dataKey="id"
		:loading="false"
		:globalFilterFields="[]"
	>
		<template #header>
			<div class="d-flex flex-wrap align-items-center justify-content-between">
				<span class="text-xl text-900 font-bold">Trips</span>
				<div>
					<span class="p-input-icon-left me-3">
						<i class="pi pi-search" />
						<InputText v-model="filters['global'].value" placeholder="Buscar" />
					</span>
					<Button icon="pi pi-plus" severity="success" @click="agregar" />
				</div>
			</div>
		</template>
		<Column field="clave" header="Clave" sortable></Column>
		<Column field="descripcion" header="" sortable />
		<!-- <Column>
					<template #body="{ data }">
						<InputSwitch v-model="data.estatus" @change="putServicio(data)" />
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
				<div class="d-flex justify-content-center" v-if="data.estatus">
					<span class="p-buttonset">
						<Button
							icon="pi pi-pencil"
							severity="warning"
							@click="modificar(data.id)"
						/>
						<!-- <Button
									icon="pi pi-trash"
									severity="danger"
									@click="deleteServicio(data.id)"
								/> -->
					</span>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

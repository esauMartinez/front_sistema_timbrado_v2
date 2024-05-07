<script lang="ts" setup>
import { FilterMatchMode } from 'primevue/api';
import { onMounted, ref } from 'vue';
import { router } from '../../../router';
import { useTrip } from '../../../composables/useTrip';
import { useTimbrado } from '../../../composables/useTimbrado';

const { mercancias, deleteMercancia } = useTimbrado();

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const agregarMercancia = () => {
	router.push({ name: 'AgregarMercanciaTrip' });
};
</script>

<template>
	<DataTable
		v-model:filters="filters"
		showGridlines
		:value="mercancias"
		stripedRows
		:class="[{ 'p-datatable-sm': true }]"
	>
		<template #header>
			<div class="flex flex-wrap align-items-center justify-content-end">
				<div>
					<Button
						icon="pi pi-plus"
						severity="success"
						@click="agregarMercancia()"
					/>
				</div>
			</div>
		</template>
		<Column header="Producto">
			<template #body="{ data }">
				{{ data.clave_producto }} - {{ data.producto }}
			</template>
		</Column>
		<Column header="Unidad de medida">
			<template #body="{ data }">
				{{ data.clave_unidad }} - {{ data.unidad_medida }}
			</template>
		</Column>
		<Column field="cantidad" header="Cantidad"></Column>
		<Column field="peso" header="Peso"></Column>
		<Column field="fraccion_arancelaria" header="F. Arancelaria"></Column>
		<Column field="pedimento" header="Pedimento"></Column>
		<Column field="embalaje" header="Embalaje"></Column>
		<Column field="tipo_documento" header="T. documento"></Column>
		<Column field="tipo_materia" header="T. materia"></Column>
		<Column field="descripcion_materia" header="D. materia"></Column>
		<Column
			field="identificador_documento_aduanero"
			header="I. aduanero"
		></Column>
		<Column field="rfc_importacion" header="RFC importacion"></Column>
		<Column>
			<template #body="{ data }">
				<div class="flex justify-content-center">
					<Button
						icon="pi pi-trash"
						severity="danger"
						@click="deleteMercancia(data.id)"
					/>
				</div>
			</template>
		</Column>
	</DataTable>
</template>

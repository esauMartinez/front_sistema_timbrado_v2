<script lang="ts" setup>
import { useCliente } from '../../../composables/useCliente';

const { contactos } = useCliente();
</script>

<template>
	<DataTable class="mt-4" :value="contactos" showGridlines stripedRows>
		<Column field="nombre" header="Nombre"></Column>
		<Column field="telefono" header="Numero de telefono"></Column>
		<Column field="email" header="Email"></Column>
	</DataTable>
</template>

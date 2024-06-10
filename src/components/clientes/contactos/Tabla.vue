<script lang="ts" setup>
import { useCliente } from '@/composables/useCliente';

const { contactos } = useCliente();
</script>

<template>
	<div v-if="contactos.length == 0">
		<h2 class="text-center">El cliente no cuenta con contacotos</h2>
	</div>
	<DataTable class="mt-4" :value="contactos" showGridlines stripedRows v-else>
		<Column field="nombre" header="Nombre"></Column>
		<Column field="telefono" header="Numero de telefono"></Column>
		<Column field="email" header="Email"></Column>
	</DataTable>
</template>

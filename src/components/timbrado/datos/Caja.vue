<script lang="ts" setup>
import { useTimbrado } from '@/composables/useTimbrado';

const { caja } = useTimbrado();
</script>

<template>
	<Panel header="Caja">
		<p class="m-0">Modelo: {{ caja.numero_economico }}</p>
		<Divider />
		<p class="m-0">Matricula: {{ caja.matricula }}</p>
		<Divider />
		<p class="m-0">Subtipo remolque: {{ caja.configuracion }}</p>
	</Panel>
</template>


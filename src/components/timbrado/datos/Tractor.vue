<script lang="ts" setup>
import { useTimbrado } from '@/composables/useTimbrado';

const { tractor } = useTimbrado();
</script>

<template>
	<Panel header="Tractor">
		<p class="m-0">Modelo: {{ tractor?.modelo }}</p>
		<Divider />
		<p class="m-0">Matricula: {{ tractor?.matricula }}</p>
		<Divider />
		<p class="m-0">Configuracion vehicular: {{ tractor?.configuracion }}</p>
	</Panel>
</template>


<script lang="ts" setup>
import { useTimbrado } from '../../composables/useTimbrado';

const { empresa, tractor } = useTimbrado();
</script>

<template>
	<Panel header="Permiso">
		<p class="m-0">Permiso SCT: {{ empresa.permiso_sct }}</p>
		<Divider />
		<p class="m-0">Numero permiso SCT: {{ empresa.numero_permiso_sct }}</p>
		<Divider />
		<p class="m-0">Aseguradora: {{ tractor.aseguradora }}</p>
		<Divider />
		<p class="m-0">Poliza: {{ tractor.numero_poliza }}</p>
	</Panel>
</template>


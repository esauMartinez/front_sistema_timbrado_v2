<script lang="ts" setup>
import { useTimbrado } from '../../composables/useTimbrado';

const { operador } = useTimbrado();
</script>

<template>
	<Panel header="Operador">
		<p class="m-0">Nombre: {{ operador.nombre }}  {{ operador.paterno }} {{ operador.materno }}</p>
		<Divider />
		<p class="m-0">RFC: {{ operador.rfc }}</p>
		<Divider />
		<p class="m-0">Licencia: {{ operador.licencia }}</p>
	</Panel>
</template>

<script lang="ts" setup>
import { useTimbrado } from '@/composables/useTimbrado';

const { empresa } = useTimbrado();
</script>

<template>
	<Panel header="Domicilio">
		<p class="m-0">Calle: {{ empresa?.calle }}</p>
		<Divider />
		<p class="m-0">Colonia: {{ empresa?.colonia }}</p>
		<Divider />
		<p class="m-0">Municipio: {{ empresa?.municipio }}</p>
		<Divider />
		<p class="m-0">Estado: {{ empresa?.estado }}</p>
		<Divider />
		<p class="m-0">Pais: {{ empresa?.pais }}</p>
		<Divider />
		<p class="m-0">Codigo postal: {{ empresa?.codigo_postal }}</p>
		<Divider />
		<p class="m-0">Tipo figura: {{ '01' }}</p>
	</Panel>
</template>

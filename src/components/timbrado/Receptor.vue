<script lang="ts" setup>
import { useTimbrado } from '../../composables/useTimbrado';

const { cliente } = useTimbrado();
</script>

<template>
	<Panel header="Receptor">
		<p class="m-0">RFC: {{ cliente?.rfc }}</p>
		<Divider />
		<p class="m-0">Nombre: {{ cliente?.razon_social }}</p>
		<Divider />
		<p class="m-0">Regimen fiscal: {{ cliente?.regimen_fiscal }}</p>
		<Divider />
		<p class="m-0">Calle: {{ cliente?.calle }}</p>
		<Divider />
		<p class="m-0">Colonia: {{ cliente?.colonia }}</p>
		<Divider />
		<p class="m-0">Municipio: {{ cliente?.municipio }}</p>
		<Divider />
		<p class="m-0">Estado: {{ cliente?.estado }}</p>
		<Divider />
		<p class="m-0">Pais: {{ cliente?.pais }}</p>
		<Divider />
		<p class="m-0">Codigo postal: {{ cliente?.codigo_postal }}</p>
		<Divider />
		<p class="m-0">Tipo figura: {{ '01' }}</p>
	</Panel>
</template>

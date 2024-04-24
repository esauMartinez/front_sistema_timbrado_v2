<script lang="ts" setup>
import { useTimbrado } from '../../composables/useTimbrado';

const { empresa } = useTimbrado();
</script>

<template>
	<Card class="emisor">
		<template #title>Emisor</template>
		<template #content>
			<p class="m-0">RFC: {{ empresa.rfc }}</p>
			<Divider />
			<p class="m-0">Nombre: {{ empresa.razon_social }}</p>
			<Divider />
			<p class="m-0">Regimen fiscal: {{ empresa.clave_regimen_fiscal }}</p>
		</template>
	</Card>
</template>

<style scoped>
.emisor {
	background-color: rgba(123, 180, 204, 0.444);
}
</style>

<script lang="ts" setup>
import { useTimbrado } from '../../composables/useTimbrado';

const { cliente } = useTimbrado();
</script>

<template>
	<Card class="receptor">
		<template #title>Receptor</template>
		<template #content>
			<p class="m-0">RFC: {{ cliente.rfc }}</p>
			<Divider />
			<p class="m-0">Nombre: {{ cliente.razon_social }}</p>
			<Divider />
			<p class="m-0">Regimen fiscal: {{ cliente.regimen_fiscal }}</p>
		</template>
	</Card>
</template>

<style scoped>
.receptor {
	background-color: rgba(86, 209, 129, 0.492);
}
</style>
<script lang="ts" setup>
import Tabla from '../components/clientes/Tabla.vue';
</script>

<template>
	<div class="container mt-5">
		<Card>
			<template #content>
				<Tabla :isModule="true" />
			</template>
		</Card>
		<RouterView />
	</div>
</template>

<style lang="scss" scoped></style>

<script lang="ts" setup>
import Tabla from '../components/usuarios/Tabla.vue';
</script>

<template>
	<div class="container mt-5">
		<Card>
			<template #content>
				<Tabla />
			</template>
		</Card>
		<RouterView />
	</div>
</template>

<style lang="scss" scoped></style>

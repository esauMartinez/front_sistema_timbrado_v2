<script lang="ts" setup>
import Tabla from '../components/cajas/Tabla.vue';
</script>

<template>
	<div class="m-margin-top">
		<Card>
			<template #content>
				<Tabla :isModule="true" />
			</template>
		</Card>
		<RouterView />
	</div>
</template>

<style lang="scss" scoped></style>

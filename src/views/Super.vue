<script lang="ts" setup>
import Tabla from '@/components/super/TablaEmpresas.vue';
</script>

<template>
	<div class="container-fluid m-margin-top">
		<Card>
			<template #content>
				<Tabla />
			</template>
		</Card>
		<RouterView />
	</div>
</template>

<style lang="scss" scoped></style>

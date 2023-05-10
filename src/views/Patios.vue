<script lang="ts" setup>
import Tabla from '../components/patios/Tabla.vue';
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

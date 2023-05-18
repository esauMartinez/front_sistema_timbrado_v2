<script lang="ts" setup>
import Tabla from '../components/trips/Tabla.vue';
</script>

<template>
	<div class="container m-margin-top">
		<Card>
			<template #content>
				<Tabla />
			</template>
		</Card>
		<RouterView />
	</div>
</template>

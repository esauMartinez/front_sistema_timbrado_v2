<script lang="ts" setup>
import Tabla from '@/components/servicios/Tabla.vue';
</script>

<template>
	<div class="col-8 col-offset-2 m-margin-top">
		<Card>
			<template #content>
				<Tabla :isModule="true" />
			</template>
		</Card>
		<RouterView />
	</div>
</template>

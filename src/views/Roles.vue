<script lang="ts" setup>
import Tabla from '../components/roles/Tabla.vue';
</script>
<template>
	<div class="col-6 col-offset-3 m-margin-top">
		<Card>
			<template #content>
				<Tabla />
			</template>
		</Card>
		<RouterView />
	</div>
</template>

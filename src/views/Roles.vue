<script lang="ts" setup>
import Tabla from '@/components/roles/Tabla.vue';
</script>
<template>
	<div class="col-10 col-offset-1 m-margin-top">
		<Card>
			<template #content>
				<Tabla />
			</template>
		</Card>
		<RouterView />
	</div>
</template>

<script lang="ts" setup>
import Tabla from "@/components/timbrado/Tabla.vue";
</script>

<template>
  <div class="m-margin-top">
    <Card>
			<template #content>
        <Tabla />
			</template>
		</Card>
		<RouterView />
  </div>
</template>
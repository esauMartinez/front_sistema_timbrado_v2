<script lang="ts" setup>
import Emisor from './Emisor.vue';
import Receptor from './Receptor.vue';
import Tabla from './servicios/Tabla.vue';
</script>

<template>
	<div class="row">
		<div class="col-lg-6">
			<Emisor />
		</div>
		<div class="col-lg-6">
			<Receptor />
		</div>
		<div class="col-lg-12 mt-3">
			<Tabla />
		</div>
	</div>

	<router-view></router-view>
</template>

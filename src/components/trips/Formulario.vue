<script lang="ts" setup>
import { onMounted } from 'vue';
import Piernas from './datos/piernas/Piernas.vue';
import Datos from './datos/Datos.vue';
import { useError } from '../../composables/useError';

const { setErrores } = useError();

onMounted(() => {
	setErrores([]);
});
</script>

<template>
	<form>
		<div class="row">
			<div class="col-lg-12">
				<Datos />
			</div>
			<div class="col-lg-12">
				<Piernas class="mt-3" />
			</div>
		</div>
	</form>
</template>

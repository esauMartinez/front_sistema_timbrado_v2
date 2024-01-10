<script lang="ts" setup>
import { onMounted } from 'vue';
import Piernas from './datos/piernas/Piernas.vue';
import TipoDeViaje from './datos/TipoDeViaje.vue';
import Servicios from './datos/servicios/Servicios.vue';
import { useError } from '../../composables/useError';
import Tabla from "./datos/mercancias/Tabla.vue";

const { setErrores } = useError();

onMounted(() => {
	setErrores([]);
});
</script>

<template>
	<form>
		<div class="row">
			<div class="col-lg-12">
				<TipoDeViaje />
			</div>
			<div class="col-lg-12">
				<Piernas class="mt-3" />
			</div>
			<div class="col-lg-12">
				<Servicios class="mt-3" />
			</div>
			<div class="col-lg-12">
				<Tabla class="mt-3" />
			</div>
		</div>
	</form>
</template>

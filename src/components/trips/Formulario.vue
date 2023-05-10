<script lang="ts" setup>
import { useTrip } from '../../composables/useTrip';
import Piernas from './datos/piernas/Piernas.vue';
import TipoDeViaje from './datos/TipoDeViaje.vue';
import Cliente from './datos/Cliente.vue';
import Operador from './datos/Operador.vue';
import Caja from './datos/Caja.vue';
import Tractor from './datos/Tractor.vue';
</script>

<template>
	<form>
		<div class="row">
			<div class="col-lg-12">
				<TipoDeViaje />
			</div>

			<div class="col-lg-6">
				<Cliente class="mt-3" />
			</div>
			<div class="col-lg-6">
				<Operador class="mt-3" />
			</div>
			<div class="col-lg-6">
				<Caja class="mt-3" />
			</div>
			<div class="col-lg-6">
				<Tractor class="mt-3" />
			</div>
			<div class="col-lg-12">
				<Piernas class="mt-3" />
			</div>
		</div>
	</form>

</template>

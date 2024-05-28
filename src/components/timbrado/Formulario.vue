<script lang="ts" setup>
import Operador from './datos/Operador.vue';
import Emisor from './datos/Emisor.vue';
import Receptor from './datos/Receptor.vue';
import TablaMercancias from './mercancias/Tabla.vue';
import TablaServicios from './servicios/Tabla.vue';
import TipoViaje from "./datos/TipoViaje.vue";
import Tractor from './datos/Tractor.vue';
import Caja from "./datos/Caja.vue";
import Permiso from "./datos/Permiso.vue";
import Datos from "./datos/Datos.vue";
</script>

<template>
	<div class="grid">
		<div class="col-12">
			<Datos />
		</div>
		<div class="col-6">
			<Emisor />
		</div>
		<div class="col-6">
			<Receptor />
		</div>
		<div class="col-12">
			<TipoViaje />
		</div>
		<div class="col">
			<Operador />
		</div>
		<div class="col">
			<Tractor />
		</div>
		<div class="col">
			<Caja />
		</div>
		<div class="col-12">
			<Permiso />
		</div>
		<div class="col-12">
			<TablaServicios />
		</div>
		<div class="col-12">
			<TablaMercancias />
		</div>
	</div>
</template>

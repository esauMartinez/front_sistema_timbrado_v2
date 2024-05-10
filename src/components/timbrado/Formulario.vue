<script lang="ts" setup>
import Operador from './Operador.vue';
import Emisor from './Emisor.vue';
import Receptor from './Receptor.vue';
import TablaMercancias from './mercancias/Tabla.vue';
import TablaServicios from './servicios/Tabla.vue';
import TipoViaje from "./TipoViaje.vue";
import Tractor from './Tractor.vue';
import Caja from "./Caja.vue";
import Permiso from "./Permiso.vue";
import Datos from "./Datos.vue";
import Domicilio from "./Domicilio.vue";
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

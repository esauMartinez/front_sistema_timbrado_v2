<script lang="ts" setup>
import Operador from '@/components/timbrado/datos/Operador.vue';
import Emisor from '@/components/timbrado/datos/Emisor.vue';
import Receptor from '@/components/timbrado/datos/Receptor.vue';
import TablaMercancias from '@/components/timbrado/mercancias/Tabla.vue';
import TablaServicios from '@/components/timbrado/servicios/Tabla.vue';
import TipoViaje from '@/components/timbrado/datos/TipoViaje.vue';
import Tractor from '@/components/timbrado/datos/Tractor.vue';
import Caja from '@/components/timbrado/datos/Caja.vue';
import Permiso from '@/components/timbrado/datos/Permiso.vue';
import Datos from '@/components/timbrado/datos/Datos.vue';
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

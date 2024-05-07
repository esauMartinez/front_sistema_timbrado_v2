<script lang="ts" setup>
import { useTimbrado } from '../../composables/useTimbrado';

const { trip, empresa, cliente } = useTimbrado();
</script>

<template>
	<Panel header="Datos">
		<p class="m-0">Version: 3.0</p>
		<Divider />
		<p class="m-0">Serie: CP</p>
		<Divider />
		<p class="m-0">Folio: {{ trip.id }}</p>
		<Divider />
		<p class="m-0">Forma de pago: {{ cliente.forma_pago }}</p>
		<Divider />
		<p class="m-0">Moneda: {{ trip.moneda }}</p>
		<Divider />
		<p class="m-0">Tipo de cambio: {{ trip.moneda == 'MXN' ? 1 : 16.5 }}</p>
		<Divider />
		<p class="m-0">Tipo de comprobante: I-ingreso</p>
		<Divider />
		<p class="m-0">Metodo de pago: {{ cliente.metodo_pago }}</p>
		<Divider />
		<p class="m-0">Lugar de expedicion: {{ cliente.codigo_postal }}</p>
	</Panel>
</template>

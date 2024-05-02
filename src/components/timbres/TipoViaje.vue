<script lang="ts" setup>
import { ref } from 'vue';
import { useTimbrado } from '../../composables/useTimbrado';
import { formatDateWithTime } from '../../pipes/formatDate';

const { trip, putRegimenAduanero } = useTimbrado();

const regimen_aduanero = ref([
	{ clave: 'IMD' },
	{ clave: 'EXD' },
	{ clave: 'ITR' },
	{ clave: 'ITE' },
	{ clave: 'ETR' },
	{ clave: 'ETE' },
	{ clave: 'DFI' },
	{ clave: 'RFE' },
	{ clave: 'RFS' },
	{ clave: 'TRA' },
]);
</script>

<template>
	<Panel header="Tipo de viaje">
		<p class="m-0">Tipo de viaje: {{ trip.tipo_viaje }}</p>
		<Divider />
		<p class="m-0">
			Ventana de carga: {{ formatDateWithTime(trip.ventana_carga) }}
		</p>
		<Divider />
		<p class="m-0">
			Ventana de entrega: {{ formatDateWithTime(trip.ventana_entrega) }}
		</p>
		<Divider />
		<label>Regimen aduanero</label>
		<Dropdown
			optionLabel="clave"
			:options="regimen_aduanero"
			optionValue="clave"
			v-model="trip.regimen_aduanero"
			placeholder="Regimen aduanero"
			class="w-full focus:border-primary mt-2"
			@change="putRegimenAduanero(trip)"
		/>
	</Panel>
</template>

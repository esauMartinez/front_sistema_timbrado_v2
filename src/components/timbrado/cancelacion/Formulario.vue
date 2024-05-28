<script lang="ts" setup>
import { ref } from 'vue';
import { useTimbrado } from '../../../composables/useTimbrado';
import { onMounted, onUpdated } from 'vue';

const { timbres, cancelacion } = useTimbrado();

const opciones_cancelacion = ref([
	{
		opcion: '01',
		descripcion: 'Comprobante emitido con errores con relacion',
	},
	{ opcion: '02', descripcion: 'Comprobante emitido con errores sin relacion' },
	{ opcion: '03', descripcion: 'No se llevo a cabo la operacion' },
	{
		opcion: '04',
		descripcion: 'Operacion nominativa relacionada en la factura global',
	},
]);

const timbresParaCancelar = ref([]);

const filtrarCancelados = () => {
	if (cancelacion.value.tipo_cancelacion !== '01') {
		cancelacion.value.uuid = null;
		timbresParaCancelar.value = [];
	} else {
		timbresParaCancelar.value = timbres.value.filter(
			(x) => x.id !== cancelacion.value.id
		);
	}
};
</script>

<template>
	<form>
		<div class="grid">
			<div class="col-12">
				<label>Opciones de cancelacion</label>
				<Dropdown
					v-model="cancelacion.tipo_cancelacion"
					:options="opciones_cancelacion"
					optionLabel="descripcion"
					optionValue="opcion"
					placeholder="Slecciona una opcion"
					class="w-full mt-2"
					@change="filtrarCancelados"
				>
					<template #option="slotProps">
						{{ slotProps.option.opcion }} -
						{{ slotProps.option.descripcion }}
					</template>
				</Dropdown>
			</div>
			<div class="col-12" v-if="cancelacion.tipo_cancelacion === '01'">
				<label>UUID de sustitucion</label>
				<Dropdown
					class="w-full focus:border-primary mt-2"
					placeholder="Timbre"
					optionLabel="uuid"
					:options="timbresParaCancelar"
					optionValue="uuid"
					v-model="cancelacion.uuid"
				>
					<template #option="slotProps">
						{{ slotProps.option.serie }} -
						{{ slotProps.option.uuid }}
					</template>
				</Dropdown>
			</div>
		</div>
	</form>
</template>

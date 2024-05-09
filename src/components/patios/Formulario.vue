<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { usePatio } from '../../composables/usePatio';
import { useError } from '../../composables/useError';
import PatioNacional from './PatioNacional.vue';
import PatioExtranjero from './PatioExtranjero.vue';

const { patio, codigos } = usePatio();
const { setErrores } = useError();

const tipo_patio = ref([{ tipo: 'nacional' }, { tipo: 'extranjero' }]);

const selectPais = (pais: string) => {
	patio.value.c_pais = pais;
};

interface Pais {
	nombre: string;
	clave: string;
}

const paises = ref<Pais[]>([
	{ nombre: 'MEXICO', clave: 'MEX' },
	{ nombre: 'ESTADOS UNIDOS', clave: 'USA' },
	{ nombre: 'CANADA', clave: 'CAN' },
]);

onMounted(() => {
	setErrores([]);
});
</script>

<template>
	<form class="formulario">
		<div class="mb-3">
			<label>Nombre patio</label>
			<InputText
				name="nombre"
				class="w-full focus:border-primary mt-2"
				placeholder="Nombre"
				autocomplete="off"
				v-model="patio.nombre"
			/>
			<small class="p-error" name="nombre"></small>
		</div>
		<div class="mb-3">
			<label>Tipo de patio</label>
			<Dropdown
				name="tipo"
				class="w-full focus:border-primary mt-2"
				filter
				placeholder="Tipo"
				optionLabel="tipo"
				optionValue="tipo"
				:options="tipo_patio"
				v-model="patio.tipo"
			/>
			<small class="p-error" name="tipo"></small>
		</div>
		<div class="grid">
			<div class="col-9 mb-3">
				<label>Pais</label>
				<Dropdown
					name="pais"
					class="w-full focus:border-primary mt-2"
					placeholder="Pais"
					optionLabel="nombre"
					filter
					:options="paises"
					optionValue="clave"
					@change="selectPais(patio.pais)"
					v-model="patio.pais"
				/>
				<small class="p-error" name="pais"></small>
			</div>
			<div class="col-3 mb-3">
				<label>Codigo</label>
				<InputText
					name="c_pais"
					class="w-full focus:border-primary mt-2"
					placeholder="Codigo pais"
					autocomplete="off"
					disabled
					v-model="patio.c_pais"
				/>
				<small class="p-error" name="c_pais"></small>
			</div>
		</div>
		
		<PatioNacional v-if="patio.tipo === 'nacional'" />

		<PatioExtranjero v-if="patio.tipo == 'extranjero'" />

		<div class="mb-3">
			<label>Calle</label>
			<InputText
				name="calle"
				class="w-full focus:border-primary mt-2"
				placeholder="Calle"
				autocomplete="off"
				v-model="patio.calle"
			/>
			<small class="p-error" name="calle"></small>
		</div>
		<div class="mb-3">
			<label>Numero exterior</label>
			<InputText
				class="w-full focus:border-primary mt-2"
				placeholder="Numero exterior"
				v-model="patio.numero_exterior"
			/>
		</div>
		<div class="mb-3">
			<label>Numero interior</label>
			<InputText
				class="w-full focus:border-primary mt-2"
				placeholder="Numero interior"
				autocomplete="off"
				v-model="patio.numero_interior"
			/>
		</div>
		<div class="mb-3">
			<label>Referencia</label>
			<InputText
				name="referencia"
				class="w-full focus:border-primary mt-2"
				placeholder="Referencia"
				autocomplete="off"
				v-model="patio.referencia"
			/>
			<small class="p-error" name="referencia"></small>
		</div>
		<div class="mb-3">
			<label>RFC</label>
			<InputText
				name="rfc"
				class="w-full focus:border-primary mt-2"
				placeholder="RFC"
				autocomplete="off"
				v-model="patio.rfc"
			/>
			<small class="p-error" name="rfc"></small>
		</div>
	</form>
</template>

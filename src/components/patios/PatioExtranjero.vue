<script lang="ts" setup>
import { usePatio } from '../../composables/usePatio';

const { patio } = usePatio();
</script>
<template>
	<div class="grid">
		<div class="col-12 mb-3">
			<label>Codigo postal</label>
			<InputText
				id="codigo_postal"
				name="codigo_postal"
				class="w-full focus:border-primary mt-2"
				placeholder="Codigo postal"
				autocomplete="off"
				:disabled="patio.c_pais === 'MEX'"
				v-model="patio.codigo_postal"
			/>
			<small class="p-error" name="codigo_postal"></small>
		</div>
	</div>
	<div class="grid">
		<div class="col-12 mb-3">
			<label>Colonia</label>
			<InputText
				id="colonia"
				name="colonia"
				class="w-full focus:border-primary mt-2"
				placeholder="Colonia"
				autocomplete="off"
				v-model="patio.colonia"
			/>
			<small class="p-error" name="colonia"></small>
		</div>
	</div>
	<div class="grid">
		<div class="col-12 mb-3">
			<label>Municipio</label>
			<InputText
				id="municipio"
				name="municipio"
				class="w-full focus:border-primary mt-2"
				placeholder="Municipio"
				autocomplete="off"
				v-model="patio.municipio"
			/>
			<small class="p-error" name="municipio"></small>
		</div>
	</div>
	<div class="grid">
		<div class="col-12 mb-3">
			<label>Estado</label>
			<InputText
				id="estado"
				name="estado"
				class="w-full focus:border-primary mt-2"
				placeholder="Estado"
				autocomplete="off"
				v-model="patio.estado"
			/>
			<small class="p-error" name="estado"></small>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { AutoCompleteChangeEvent } from 'primevue/autocomplete';
import { usePatio } from '../../composables/usePatio';

const { patio, codigos, buscarCodigoPostal } = usePatio();

const verificarCP = (e: AutoCompleteChangeEvent) => {
	console.log(e.value);
	patio.value.c_colonia = e.value.id_asenta_cpcons;
	patio.value.c_municipio = e.value.c_mnpio;
	patio.value.c_estado = e.value.abreviatura_estado;

	patio.value.colonia = e.value.d_asenta;
	patio.value.municipio = e.value.D_mnpio;
	patio.value.estado = e.value.d_estado;
	patio.value.localidad = e.value.c_cve_ciudad;
};
</script>
<template>
	<div class="grid">
		<div class="col-9 mb-3">
			<label>Codigo postal</label>
			<AutoComplete
				v-model="patio.codigo_postal"
				:suggestions="codigos"
				optionLabel="d_asenta"
				placeholder="Codigo postal"
				name="codigo_postal"
				@change="verificarCP"
				@complete="buscarCodigoPostal(patio.codigo_postal)"
				class="w-full focus:border-primary mt-2"
			>
				<template #option="slotProps">
					{{ slotProps.option.d_asenta }}
				</template>
			</AutoComplete>
			<small class="p-error" name="codigo_postal"></small>
		</div>
		<div class="col-3 mb-3">
			<label>Localidad</label>
			<InputText
				id="localidad"
				name="localidad"
				class="w-full focus:border-primary mt-2"
				placeholder="Localidad"
				autocomplete="off"
				:disabled="patio.c_pais === 'MEX'"
				v-model="patio.localidad"
			/>
			<small class="p-error" name="localidad"></small>
		</div>
	</div>
	<div class="grid">
		<div class="col-9 mb-3">
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
		<div class="col-3 mb-3">
			<label>Codigo</label>
			<InputText
				name="c_colonia"
				class="w-full focus:border-primary mt-2"
				placeholder="Codigo colonia"
				autocomplete="off"
				:disabled="patio.c_pais === 'MEX'"
				v-model="patio.c_colonia"
			/>
			<small class="p-error" name="c_colonia"></small>
		</div>
	</div>
	<div class="grid">
		<div class="col-9 mb-3">
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
		<div class="col-3 mb-3">
			<label>Codigo</label>
			<InputText
				name="c_municipio"
				class="w-full focus:border-primary mt-2"
				placeholder="Codigo municipio"
				autocomplete="off"
				:disabled="patio.c_pais === 'MEX'"
				v-model="patio.c_municipio"
			/>
			<small class="p-error" name="c_municipio"></small>
		</div>
	</div>
	<div class="grid">
		<div class="col-9 mb-3">
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
		<div class="col-3 mb-3">
			<label>Codigo</label>
			<InputText
				name="c_estado"
				class="w-full focus:border-primary mt-2"
				placeholder="Codigo estado"
				autocomplete="off"
				:disabled="patio.c_pais === 'MEX'"
				v-model="patio.c_estado"
			/>
			<small class="p-error" name="c_estado"></small>
		</div>
	</div>
</template>

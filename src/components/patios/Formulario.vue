<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { usePatio } from '../../composables/usePatio';
import { CodigoPostal } from '../../interfaces/codigo_postal.model';
import { useError } from '../../composables/useError';
import { AutoCompleteChangeEvent } from 'primevue/autocomplete';

const { patio, codigos, buscarCodigoPostal } = usePatio();
const { setErrores } = useError();

const tipo_patio = ref([{ tipo: 'nacional' }, { tipo: 'extranjero' }]);

const selectCode = (codigo: CodigoPostal) => {
	patio.value.c_colonia = codigo.id_asenta_cpcons;
	patio.value.c_municipio = codigo.c_mnpio;
	patio.value.c_estado = codigo.c_estado;
	patio.value.c_pais = patio.value.pais;

	patio.value.colonia = codigo.d_asenta;
	patio.value.municipio = codigo.D_mnpio;
	patio.value.estado = codigo.d_estado;
	patio.value.localidad = codigo.c_cve_ciudad;
};

const selectPais = (pais: string) => {
	patio.value.c_pais = pais;
};

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
					disabled
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
					disabled
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
					disabled
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
					disabled
					v-model="patio.c_estado"
				/>
				<small class="p-error" name="c_estado"></small>
			</div>
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

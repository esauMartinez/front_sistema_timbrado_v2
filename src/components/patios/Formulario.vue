<script lang="ts" setup>
import { ref } from 'vue';
import { usePatio } from '../../composables/usePatio';
import { CodigoPostal } from '../../interfaces/codigo_postal.model';

const { patio, codigos, buscarCodigoPostal } = usePatio();

const tipo_patio = ref([{ tipo: 'nacional' }, { tipo: 'extranjero' }]);

const selectCode = (codigo: CodigoPostal) => {
	codigos.value = [];
	patio.value.c_colonia = codigo.id_asenta_cpcons;
	patio.value.c_municipio = codigo.c_mnpio;
	patio.value.c_estado = codigo.c_estado;
	patio.value.c_pais = patio.value.pais;

	patio.value.colonia = codigo.d_asenta;
	patio.value.municipio = codigo.D_mnpio;
	patio.value.estado = codigo.d_estado;
	patio.value.localidad = codigo.c_cve_ciudad;
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

const selectPais = (pais: string) => {
	patio.value.c_pais = pais;
};
</script>

<template>
	<form>
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<label>Nombre patio</label>
				<InputText
					name="nombre"
					class="w-100"
					placeholder="Nombre"
					autocomplete="off"
					v-model="patio.nombre"
				/>
				<small class="p-error" name="nombre"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Tipo de patio</label>
				<Dropdown
					name="tipo"
					class="w-100"
					filter
					placeholder="Tipo"
					optionLabel="tipo"
					optionValue="tipo"
					:options="tipo_patio"
					v-model="patio.tipo"
				/>
				<small class="p-error" name="tipo"></small>
			</div>
			<div class="col-lg-10 mb-3">
				<label>Codigo postal</label>
				<InputText
					name="codigo_postal"
					class="w-100"
					placeholder="Codigo postal"
					autocomplete="off"
					v-model="patio.codigo_postal"
					@keyup="buscarCodigoPostal(patio.codigo_postal)"
				/>
				<small class="p-error" name="codigo_postal"></small>
				<div class="list-container" v-if="codigos.length !== 0">
					<ul class="list">
						<li v-for="item in codigos" @click="selectCode(item)">
							{{ item.d_asenta }}
						</li>
					</ul>
				</div>
			</div>
			<div class="col-lg-2 mb-3">
				<label>Localidad</label>
				<InputText
					id="localidad"
					name="localidad"
					class="w-100"
					placeholder="Localidad"
					autocomplete="off"
					disabled
					v-model="patio.localidad"
				/>
				<small class="p-error" name="localidad"></small>
			</div>
			<div class="col-lg-10 mb-3">
				<label>Colonia</label>
				<InputText
					id="colonia"
					name="colonia"
					class="w-100"
					placeholder="Colonia"
					autocomplete="off"
					v-model="patio.colonia"
				/>
				<small class="p-error" name="colonia"></small>
			</div>
			<div class="col-lg-2 mb-3">
				<label>Codigo</label>
				<InputText
					name="c_colonia"
					class="w-100"
					placeholder="Codigo colonia"
					autocomplete="off"
					disabled
					v-model="patio.c_colonia"
				/>
				<small class="p-error" name="c_colonia"></small>
			</div>
			<div class="col-lg-10 mb-3">
				<label>Municipio</label>
				<InputText
					id="municipio"
					name="municipio"
					class="w-100"
					placeholder="Municipio"
					autocomplete="off"
					v-model="patio.municipio"
				/>
				<small class="p-error" name="municipio"></small>
			</div>
			<div class="col-lg-2 mb-3">
				<label>Codigo</label>
				<InputText
					name="c_municipio"
					class="w-100"
					placeholder="Codigo municipio"
					autocomplete="off"
					disabled
					v-model="patio.c_municipio"
				/>
				<small class="p-error" name="c_municipio"></small>
			</div>
			<div class="col-lg-10 mb-3">
				<label>Estado</label>
				<InputText
					id="estado"
					name="estado"
					class="w-100"
					placeholder="Estado"
					autocomplete="off"
					v-model="patio.estado"
				/>
				<small class="p-error" name="estado"></small>
			</div>
			<div class="col-lg-2 mb-3">
				<label>Codigo</label>
				<InputText
					name="c_estado"
					class="w-100"
					placeholder="Codigo estado"
					autocomplete="off"
					disabled
					v-model="patio.c_estado"
				/>
				<small class="p-error" name="c_estado"></small>
			</div>
			<div class="col-lg-10 mb-3">
				<label>Pais</label>
				<Dropdown
					name="pais"
					class="w-100"
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
			<div class="col-lg-2 mb-3">
				<label>Codigo</label>
				<InputText
					name="c_pais"
					class="w-100"
					placeholder="Codigo pais"
					autocomplete="off"
					disabled
					v-model="patio.c_pais"
				/>
				<small class="p-error" name="c_pais"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Calle</label>
				<InputText
					name="calle"
					class="w-100"
					placeholder="Calle"
					autocomplete="off"
					v-model="patio.calle"
				/>
				<small class="p-error" name="calle"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero exterior"
					v-model="patio.numero_exterior"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero interior"
					autocomplete="off"
					v-model="patio.numero_interior"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Referencia</label>
				<InputText
					name="referencia"
					class="w-100"
					placeholder="Referencia"
					autocomplete="off"
					v-model="patio.referencia"
				/>
				<small class="p-error" name="referencia"></small>
			</div>
		</div>
	</form>
</template>

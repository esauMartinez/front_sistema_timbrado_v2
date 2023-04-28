<script lang="ts" setup>
import { ref } from 'vue';
import { usePatio } from '../../composables/usePatio';
import { CodigoPostal } from '../../interfaces/codigo_postal.model';

const { patio, codigos, buscarCodigoPostal } = usePatio();

const tipo_patio = ref([{ tipo: 'nacional' }, { tipo: 'extranjero' }]);

const selectCode = (codigo: CodigoPostal) => {
	console.log(codigo);
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
	{ nombre: 'MEXICO', clave: 'MX' },
	{ nombre: 'ESTADOS UNIDOS', clave: 'USA' },
	{ nombre: 'CANADA', clave: 'CAN' },
]);
</script>

<template>
	<form>
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Nombre"
					autocomplete="off"
					required
					v-model="patio.nombre"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Dropdown
					class="w-100"
					filter
					placeholder="Tipo"
					optionLabel="tipo"
					optionValue="tipo"
					:options="tipo_patio"
					v-model="patio.tipo"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Codigo postal"
					autocomplete="off"
					required
					v-model="patio.codigo_postal"
					@keyup="buscarCodigoPostal(patio.codigo_postal)"
				/>
				<div class="list-container" v-if="codigos.length !== 0">
					<ul class="list">
						<li v-for="item in codigos" @click="selectCode(item)">
							{{ item.d_asenta }}
						</li>
					</ul>
				</div>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Localidad"
					autocomplete="off"
					required
					v-model="patio.localidad"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Colonia"
					autocomplete="off"
					required
					v-model="patio.colonia"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Municipio"
					autocomplete="off"
					required
					v-model="patio.municipio"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Estado"
					autocomplete="off"
					required
					v-model="patio.estado"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Dropdown
					class="w-100"
					placeholder="Pais"
					optionLabel="nombre"
					filter
					:options="paises"
					optionValue="clave"
					v-model="patio.pais"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Calle"
					autocomplete="off"
					required
					v-model="patio.calle"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero exterior"
					autocomplete="off"
					required
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
				<InputText
					class="w-100"
					placeholder="Referencia"
					autocomplete="off"
					required
					v-model="patio.referencia"
				/>
			</div>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useOperador } from '../../composables/useOperador';
import { useError } from '../../composables/useError';

const { operador } = useOperador();
const { setErrores } = useError();

onMounted(() => {
	setErrores([]);
});
const estados = ref([
	{ item: 'AGUASCALIENTES' },
	{ item: 'BAJA CALIFORNIA' },
	{ item: 'BAJA CALIFORNIA SUR' },
	{ item: 'CAMPECHE' },
	{ item: 'COAHUILA' },
	{ item: 'COLIMA' },
	{ item: 'CHIAPAS' },
	{ item: 'CHIHUAHUA' },
	{ item: 'CIUDAD DE MEXICO' },
	{ item: 'DURANGO' },
	{ item: 'GUANAJUATO' },
	{ item: 'GUERRERO' },
	{ item: 'HIDALGO' },
	{ item: 'JALISCO' },
	{ item: 'MEXICO' },
	{ item: 'MICHOACAN' },
	{ item: 'MORELOS' },
	{ item: 'NAYARIT' },
	{ item: 'NUEVO LEON' },
	{ item: 'OAXACA' },
	{ item: 'PUEBLA' },
	{ item: 'QUERETARO' },
	{ item: 'QUINTANA ROO' },
	{ item: 'SAN LUIS POTOSI' },
	{ item: 'SINALOA' },
	{ item: 'SONORA' },
	{ item: 'TABASCO' },
	{ item: 'TAMAULIPAS' },
	{ item: 'TLAXCALA' },
	{ item: 'VERACRUZ' },
	{ item: 'YUCATAN' },
	{ item: 'ZACATECAS' },
	{ item: 'ESTADO DE MEXICO' },
	{ item: 'DISTRITO FEDERAL' },
]);

const paises = ref([
	{ item: 'MEXICO' },
	{ item: 'ESTADOS UNIDOS' },
	{ item: 'CANADA' },
]);
</script>

<template>
	<form class="formulario p-2">
		<div class="mb-3">
			<label>Nombre</label>
			<InputText
				id="nombre"
				name="nombre"
				class="w-full focus:border-primary mt-2"
				placeholder="Nombre"
				autocomplete="off"
				v-model="operador.nombre"
			/>
			<small class="p-error" name="nombre"></small>
		</div>
		<div class="mb-3">
			<label>Apellido paterno</label>
			<InputText
				id="paterno"
				name="paterno"
				class="w-full focus:border-primary mt-2"
				placeholder="Apellido paterno"
				v-model="operador.paterno"
			/>
			<small class="p-error" name="paterno"></small>
		</div>
		<div class="mb-3">
			<label>Apellido materno</label>
			<InputText
				id="materno"
				name="materno"
				class="w-full focus:border-primary mt-2"
				placeholder="Apellido materno"
				v-model="operador.materno"
			/>
			<small class="p-error" name="materno"></small>
		</div>
		<div class="mb-3">
			<label>Fecha de nacimiento</label>
			<Calendar
				id="fecha_nacimiento"
				name="fecha_nacimiento"
				class="w-full focus:border-primary mt-2"
				placeholder="Fecha de nacimiento"
				v-model="operador.fecha_nacimiento"
				dateFormat="dd/mm/yy"
				showIcon
			/>
			<small class="p-error" name="fecha_nacimiento"></small>
		</div>
		<div class="mb-3">
			<label>Fecha de ingreso</label>
			<Calendar
				id="fecha_ingreso"
				name="fecha_ingreso"
				class="w-full focus:border-primary mt-2"
				placeholder="Fecha de ingreso"
				v-model="operador.fecha_ingreso"
				dateFormat="dd/mm/yy"
				showIcon
			/>
			<small class="p-error" name="fecha_ingreso"></small>
		</div>
		<div class="mb-3">
			<label>CURP</label>
			<InputText
				id="curp"
				name="curp"
				class="w-full focus:border-primary mt-2"
				placeholder="CURP"
				v-model="operador.curp"
			/>
			<small class="p-error" name="curp"></small>
		</div>
		<div class="mb-3">
			<label>RFC</label>
			<InputText
				id="rfc"
				name="rfc"
				class="w-full focus:border-primary mt-2"
				placeholder="RFC"
				v-model="operador.rfc"
			/>
			<small class="p-error" name="rfc"></small>
		</div>
		<div class="mb-3">
			<label>Codigo postal</label>
			<InputText
				id="codigo_postal"
				name="codigo_postal"
				class="w-full focus:border-primary mt-2"
				placeholder="Codigo postal"
				v-model="operador.codigo_postal"
			/>
			<small class="p-error" name="codigo_postal"></small>
		</div>
		<div class="mb-3">
			<label>Colonia</label>
			<InputText
				id="colonia"
				name="colonia"
				class="w-full focus:border-primary mt-2"
				placeholder="Colonia"
				v-model="operador.colonia"
			/>
			<small class="p-error" name="colonia"></small>
		</div>
		<div class="mb-3">
			<label>Municipio</label>
			<InputText
				id="municipio"
				name="municipio"
				class="w-full focus:border-primary mt-2"
				placeholder="Municipio"
				v-model="operador.municipio"
			/>
			<small class="p-error" name="municipio"></small>
		</div>
		<div class="mb-3">
			<label>Estado</label>
			<Dropdown
				id="estado"
				name="estado"
				class="w-full focus:border-primary mt-2"
				:options="estados"
				placeholder="Estado"
				optionLabel="item"
				optionValue="item"
				v-model="operador.estado"
			/>
			<small class="p-error" name="estado"></small>
		</div>
		<div class="mb-3">
			<label>Pais</label>
			<Dropdown
				id="pais"
				name="pais"
				class="w-full focus:border-primary mt-2"
				:options="paises"
				placeholder="Pais"
				optionLabel="item"
				optionValue="item"
				v-model="operador.pais"
			/>
			<small class="p-error" name="pais"></small>
		</div>
		<div class="mb-3">
			<label>Calle</label>
			<InputText
				id="calle"
				name="calle"
				class="w-full focus:border-primary mt-2"
				placeholder="Calle"
				v-model="operador.calle"
			/>
			<small class="p-error" name="calle"></small>
		</div>
		<div class="mb-3">
			<label>Numero exterior</label>
			<InputText
				id="numero_exterior"
				name="numero_exterior"
				class="w-full focus:border-primary mt-2"
				placeholder="Numero exterior"
				v-model="operador.numero_exterior"
			/>
			<small class="p-error" name="numero_exterior"></small>
		</div>
		<div class="mb-3">
			<label>Numero interior</label>
			<InputText
				id="numero_interior"
				name="numero_interior"
				class="w-full focus:border-primary mt-2"
				placeholder="Numero interior"
				v-model="operador.numero_interior"
			/>
			<small class="p-error" name="numero_interior"></small>
		</div>
		<div class="mb-3">
			<label>Licencia</label>
			<InputText
				id="licencia"
				name="licencia"
				class="w-full focus:border-primary mt-2"
				placeholder="Licencia"
				v-model="operador.licencia"
			/>
			<small class="p-error" name="licencia"></small>
		</div>
		<div class="mb-3">
			<label>Vencimiento de la licencia</label>
			<Calendar
				id="vencimiento_licencia"
				name="vencimiento_licencia"
				class="w-full focus:border-primary mt-2"
				placeholder="Vencimiento de licencia"
				v-model="operador.vencimiento_licencia"
				showIcon
			/>
			<small class="p-error" name="vencimiento_licencia"></small>
		</div>
	</form>
</template>

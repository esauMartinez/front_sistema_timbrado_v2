<script lang="ts" setup>
import { useOperador } from '../../composables/useOperador';

const { resetOperadorForm, operador } = useOperador();
</script>

<template>
	<form>
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<label>Nombre</label>
				<InputText
					id="nombre"
					name="nombre"
					class="w-100"
					placeholder="Nombre"
					autocomplete="off"
					v-model="operador.nombre"
				/>
				<small class="p-error" name="nombre"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Apellido paterno</label>
				<InputText
					id="paterno"
					name="paterno"
					class="w-100"
					placeholder="Apellido paterno"
					v-model="operador.paterno"
				/>
				<small class="p-error" name="paterno"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Apellido materno</label>
				<InputText
					id="materno"
					name="materno"
					class="w-100"
					placeholder="Apellido materno"
					v-model="operador.materno"
				/>
				<small class="p-error" name="materno"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Fecha de nacimiento</label>
				<Calendar
					id="fecha_nacimiento"
					name="fecha_nacimiento"
					class="w-100"
					placeholder="Fecha de nacimiento"
					v-model="operador.fecha_nacimiento"
					:numberOfMonths="2"
					touchUI
					showIcon
				/>
				<small class="p-error" name="fecha_nacimiento"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Fecha de ingreso</label>
				<Calendar
					id="fecha_ingreso"
					name="fecha_ingreso"
					class="w-100"
					placeholder="Fecha de ingreso"
					v-model="operador.fecha_ingreso"
					showIcon
				/>
				<small class="p-error" name="fecha_ingreso"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>CURP</label>
				<InputText
					id="curp"
					name="curp"
					class="w-100"
					placeholder="CURP"
					v-model="operador.curp"
				/>
				<small class="p-error" name="curp"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>RFC</label>
				<InputText
					id="rfc"
					name="rfc"
					class="w-100"
					placeholder="RFC"
					v-model="operador.rfc"
				/>
				<small class="p-error" name="rfc"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Codigo postal</label>
				<InputText
					id="codigo_postal"
					name="codigo_postal"
					class="w-100"
					placeholder="Codigo postal"
					v-model="operador.codigo_postal"
				/>
				<small class="p-error" name="codigo_postal"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Colonia</label>
				<InputText
					id="colonia"
					name="colonia"
					class="w-100"
					placeholder="Colonia"
					v-model="operador.colonia"
				/>
				<small class="p-error" name="colonia"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Municipio</label>
				<InputText
					id="municipio"
					name="municipio"
					class="w-100"
					placeholder="Municipio"
					v-model="operador.municipio"
				/>
				<small class="p-error" name="municipio"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Estado</label>
				<InputText
					id="estado"
					name="estado"
					class="w-100"
					placeholder="Estado"
					v-model="operador.estado"
				/>
				<small class="p-error" name="estado"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Pais</label>
				<InputText
					id="pais"
					name="pais"
					class="w-100"
					placeholder="Pais"
					v-model="operador.pais"
				/>
				<small class="p-error" name="pais"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Calle</label>
				<InputText
					id="calle"
					name="calle"
					class="w-100"
					placeholder="Calle"
					v-model="operador.calle"
				/>
				<small class="p-error" name="calle"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Numero exterior</label>
				<InputText
					id="numero_exterior"
					name="numero_exterior"
					class="w-100"
					placeholder="Numero exterior"
					v-model="operador.numero_exterior"
				/>
				<small class="p-error" name="numero_exterior"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Numero interior</label>
				<InputText
					id="numero_interior"
					name="numero_interior"
					class="w-100"
					placeholder="Numero interior"
					v-model="operador.numero_interior"
				/>
				<small class="p-error" name="numero_interior"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Licencia</label>
				<InputText
					id="licencia"
					name="licencia"
					class="w-100"
					placeholder="Licencia"
					v-model="operador.licencia"
				/>
				<small class="p-error" name="licencia"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Vencimiento de la licencia</label>
				<Calendar
					id="vencimiento_licencia"
					name="vencimiento_licencia"
					class="w-100"
					placeholder="Vencimiento de licencia"
					v-model="operador.vencimiento_licencia"
					showIcon
				/>
				<small class="p-error" name="vencimiento_licencia"></small>
			</div>
		</div>
	</form>
</template>

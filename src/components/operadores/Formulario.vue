<script lang="ts" setup>
import { onMounted } from 'vue';
import { useOperador } from '../../composables/useOperador';

const { operador } = useOperador();
</script>

<template>
	<form>
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Nombre"
					name="nombre"
					v-model="operador.nombre"
					autocomplete="off"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Apellido paterno"
					v-model="operador.paterno"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Apellido materno"
					v-model="operador.materno"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Calendar
					class="w-100"
					placeholder="Fecha de nacimiento"
					v-model="operador.fecha_nacimiento"
          :numberOfMonths="2"
          touchUI
					showIcon
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Calendar
					class="w-100"
					placeholder="Fecha de ingreso"
					v-model="operador.fecha_ingreso"
					showIcon
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="CURP"
					v-model="operador.curp"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="RFC"
					v-model="operador.rfc"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Codigo postal"
					v-model="operador.codigo_postal"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Colonia"
					v-model="operador.colonia"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Municipio"
					v-model="operador.municipio"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Estado"
					v-model="operador.estado"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Pais"
					v-model="operador.pais"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Calle"
					v-model="operador.calle"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero exterior"
					v-model="operador.numero_exterior"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero interior"
					v-model="operador.numero_interior"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Licencia"
					v-model="operador.licencia"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Calendar
					class="w-100"
					placeholder="Vencimiento de licencia"
					v-model="operador.vencimiento_licencia"
					showIcon
				/>
			</div>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useCaja } from '../../composables/useCaja';

const { unidad, marcas, configuraciones, getMarcas, getConfiguraciones } =
	useCaja();

onMounted(() => {
	getMarcas();
	getConfiguraciones();
});
</script>

<template>
	<form class="formulario">
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<label>Numero economico</label>
				<InputText
					id="numero_economico"
					name="numero_economico"
					class="w-100"
					placeholder="Numero economico"
					v-model="unidad.numero_economico"
					autocomplete="off"
				/>
				<small class="p-error" name="numero_economico"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Matricula</label>
				<InputText
					id="matricula"
					name="matricula"
					class="w-100"
					placeholder="Matricula"
					v-model="unidad.matricula"
				/>
				<small class="p-error" name="matricula"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Numero de serie</label>
				<InputText
					id="numero_serie"
					name="numero_serie"
					class="w-100"
					placeholder="Numero de serie"
					v-model="unidad.numero_serie"
				/>
				<small class="p-error" name="numero_serie"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Numero de poliza</label>
				<InputText
					id="numero_poliza"
					name="numero_poliza"
					class="w-100"
					placeholder="Numero de poliza"
					v-model="unidad.numero_poliza"
				/>
				<small class="p-error" name="numero_poliza"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Vencimiento de la poliza</label>
				<Calendar
					id="vencimiento_poliza"
					name="vencimiento_poliza"
					class="w-100"
					placeholder="Vencimiento de la poliza"
					v-model="unidad.vencimiento_poliza"
					:numberOfMonths="1"
					showIcon
				/>
				<small class="p-error" name="vencimiento_poliza"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Modelo</label>
				<Calendar
					id="modelo"
					name="modelo"
					class="w-100"
					placeholder="Modelo"
					v-model="unidad.modelo"
					view="year"
					dateFormat="yy"
					showIcon
				/>
				<small class="p-error" name="modelo"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Aseguradora</label>
				<InputText
					id="aseguradora"
					name="aseguradora"
					class="w-100"
					placeholder="Aseguradora"
					v-model="unidad.aseguradora"
				/>
				<small class="p-error" name="aseguradora"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Configuracion</label>
				<Dropdown
					id="configuracion"
					name="configuracion"
					class="w-100"
					filter
					placeholder="Configuracion"
					optionLabel="nombre"
					:options="configuraciones"
					optionValue="id"
					v-model="unidad.configuracion"
				/>
				<small class="p-error" name="configuracion"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Marca</label>
				<Dropdown
					id="marca_id"
					name="marca_id"
					class="w-100"
					placeholder="Marca"
					optionLabel="nombre"
					filter
					:options="marcas"
					optionValue="id"
					v-model="unidad.marca_id"
				/>
				<small class="p-error" name="marca_id"></small>
			</div>
		</div>
	</form>
</template>

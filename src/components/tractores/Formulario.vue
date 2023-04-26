<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTractor } from '../../composables/useTractor';

const { unidad, marcas, configuraciones, getMarcas, getConfiguraciones } =
	useTractor();

onMounted(() => {
	getMarcas();
	getConfiguraciones();
});
</script>

<template>
	<form>
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero economico"
					v-model="unidad.numero_economico"
					autocomplete="off"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Matricula"
					v-model="unidad.matricula"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero de serie"
					v-model="unidad.numero_serie"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero de poliza"
					v-model="unidad.numero_poliza"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Calendar
					class="w-100"
					placeholder="Vencimiento de la poliza"
					v-model="unidad.vencimiento_poliza"
					:numberOfMonths="1"
					showIcon
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Calendar
					class="w-100"
					placeholder="Modelo"
					v-model="unidad.modelo"
					view="year"
					dateFormat="yy"
					showIcon
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Aseguradora"
					v-model="unidad.aseguradora"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Dropdown
					class="w-100"
					filter
					placeholder="Configuracion"
					optionLabel="nombre"
					:options="configuraciones"
					optionValue="id"
					v-model="unidad.configuracion"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Dropdown
					class="w-100"
					placeholder="Marca"
					optionLabel="nombre"
					filter
					:options="marcas"
					optionValue="id"
					v-model="unidad.marca_id"
				/>
			</div>
		</div>
	</form>
</template>

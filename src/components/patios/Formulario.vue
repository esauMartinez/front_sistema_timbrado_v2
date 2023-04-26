<script lang="ts" setup>
import { ref } from 'vue'
import { usePatio } from '../../composables/usePatio';

const { patio } = usePatio();

const tipo_patio = ref([
	{
		tipo: 'nacional'
	},
	{
		tipo: 'extranjero'
	}
])
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
				/>
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
				<InputText
					class="w-100"
					placeholder="Pais"
					autocomplete="off"
					required
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

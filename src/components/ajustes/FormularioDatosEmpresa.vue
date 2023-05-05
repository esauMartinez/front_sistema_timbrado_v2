<script lang="ts" setup>
import { onMounted } from 'vue';
import { useEmpresa } from '../../composables/useEmpresa';

const { empresa, getEmpresa } = useEmpresa();

onMounted(async () => {
	await getEmpresa(1);
});
</script>

<template>
	<form>
		<div class="row p-2">
			<div class="col-lg-6 mb-3">
				<InputText
					class="w-100"
					placeholder="Calle"
					autocomplete="off"
					required
					v-model="empresa.calle"
				/>
			</div>
			<div class="col-lg-6 mb-3">
				<InputText
					class="w-100"
					placeholder="Colonia"
					autocomplete="off"
					required
					v-model="empresa.colonia"
				/>
			</div>
			<div class="col-lg-4 mb-3">
				<InputText
					class="w-100"
					placeholder="Municipio"
					autocomplete="off"
					required
					v-model="empresa.municipio"
				/>
			</div>
			<div class="col-lg-4 mb-3">
				<InputText
					class="w-100"
					placeholder="Estado"
					autocomplete="off"
					required
					v-model="empresa.estado"
				/>
			</div>
			<div class="col-lg-4 mb-3">
				<InputText
					class="w-100"
					placeholder="Pais"
					autocomplete="off"
					required
					v-model="empresa.pais"
				/>
			</div>
			<div class="col-lg-6 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero exteriro"
					autocomplete="off"
					required
					v-model="empresa.numero_exterior"
				/>
			</div>
			<div class="col-lg-6 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero interior"
					autocomplete="off"
					required
					v-model="empresa.numero_interior"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Codigo postal"
					autocomplete="off"
					required
					v-model="empresa.codigo_postal"
				/>
			</div>
			<div class="col-lg-4 mb-3">
				<InputText
					class="w-100"
					placeholder="Regimen fiscal"
					autocomplete="off"
					required
					v-model="empresa.clave_regimen_fiscal"
				/>
			</div>
			<div class="col-lg-4 mb-3">
				<InputText
					class="w-100"
					placeholder="Permiso SCT"
					autocomplete="off"
					required
					v-model="empresa.permiso_sct"
				/>
			</div>
			<div class="col-lg-4 mb-3">
				<InputText
					class="w-100"
					placeholder="Numero permiso SCT"
					autocomplete="off"
					required
					v-model="empresa.numero_permiso_sct"
				/>
			</div>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useEmpresa } from '../../composables/useEmpresa';

const { empresa, getEmpresa } = useEmpresa();

onMounted(async () => {
	await getEmpresa();
});
</script>

<template>
	<form class="p-2">
		<div class="grid">
			<div class="col-4 mb-3">
				<label>Calle</label>
				<InputText
					class="w-full focus:border-primary mt-2"
					placeholder="Calle"
					autocomplete="off"
					required
					v-model="empresa.calle"
				/>
			</div>
			<div class="col-4 mb-3">
				<label>Colonia</label>
				<InputText
					class="w-full focus:border-primary mt-2"
					placeholder="Colonia"
					autocomplete="off"
					required
					v-model="empresa.colonia"
				/>
			</div>
			<div class="col-4 mb-3">
				<label>Municipio</label>
				<InputText
					class="w-full focus:border-primary mt-2"
					placeholder="Municipio"
					autocomplete="off"
					required
					v-model="empresa.municipio"
				/>
			</div>
			<div class="col-4 mb-3">
				<label>Estado</label>
				<InputText
					class="w-full focus:border-primary mt-2"
					placeholder="Estado"
					autocomplete="off"
					required
					v-model="empresa.estado"
				/>
			</div>
			<div class="col-4 mb-3">
				<label>Pais</label>
				<InputText
					class="w-full focus:border-primary mt-2"
					placeholder="Pais"
					autocomplete="off"
					required
					v-model="empresa.pais"
				/>
			</div>
			<div class="col-4 mb-3">
				<label>Numero exterior</label>
				<InputText
					class="w-full focus:border-primary mt-2"
					placeholder="Numero exteriro"
					autocomplete="off"
					required
					v-model="empresa.numero_exterior"
				/>
			</div>
			<div class="col-4 mb-3">
				<label>Numero interior</label>
				<InputText
					class="w-full focus:border-primary mt-2"
					placeholder="Numero interior"
					autocomplete="off"
					required
					v-model="empresa.numero_interior"
				/>
			</div>
			<div class="col-4 mb-3">
				<label>Codigo postal</label>
				<InputText
					class="w-full focus:border-primary mt-2"
					placeholder="Codigo postal"
					autocomplete="off"
					required
					v-model="empresa.codigo_postal"
				/>
			</div>
			<div class="col-4 mb-3">
				<label>Regimen fiscal</label>
				<InputText
					class="w-full focus:border-primary mt-2"
					placeholder="Regimen fiscal"
					autocomplete="off"
					required
					v-model="empresa.clave_regimen_fiscal"
				/>
			</div>
			<div class="col-6 mb-3">
				<label>Permiso SCT</label>
				<InputText
					class="w-full focus:border-primary mt-2"
					placeholder="Permiso SCT"
					autocomplete="off"
					required
					v-model="empresa.permiso_sct"
				/>
			</div>
			<div class="col-6 mb-3">
				<label>Numero permiso SCT</label>
				<InputText
					class="w-full focus:border-primary mt-2"
					placeholder="Numero permiso SCT"
					autocomplete="off"
					required
					v-model="empresa.numero_permiso_sct"
				/>
			</div>
			<div class="col-4 col-offset-8">
				<Button
					type="submit"
					icon="pi pi-pencil"
					label="Modificar datos"
					class="w-full"
					form="formulario-datos-empresa"
				/>
			</div>
		</div>
	</form>
</template>

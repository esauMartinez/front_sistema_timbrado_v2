<script lang="ts" setup>
import { onMounted } from 'vue';
import { useError } from '../../composables/useError';
import { useServicio } from '../../composables/useServicio';

const { servicio } = useServicio();
const { setErrores } = useError();

onMounted(() => {
	setErrores([]);
});
</script>

<template>
	<form class="formulario p-2">
		<div class="mb-3">
			<label>Clave del servicio</label>
			<InputText
				name="clave"
				class="w-full focus:border-primary mt-2"
				placeholder="Clave"
				autocomplete="off"
				v-model="servicio.clave"
			/>
			<small class="p-error" name="clave"></small>
		</div>
		<div class="mb-3">
			<label>Descripcion del servicio</label>
			<InputText
				name="descripcion"
				class="w-full focus:border-primary mt-2"
				placeholder="Descripcion"
				v-model="servicio.descripcion"
			/>
			<small class="p-error" name="descripcion"></small>
		</div>
	</form>
</template>

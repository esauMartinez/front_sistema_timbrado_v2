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
	<form class="formulario">
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<label>Clave del servicio</label>
				<InputText
					name="clave"
					class="w-100"
					placeholder="Clave"
					autocomplete="off"
					v-model="servicio.clave"
				/>
				<small class="p-error" name="clave"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Descripcion del servicio</label>
				<InputText
					name="descripcion"
					class="w-100"
					placeholder="Descripcion"
					v-model="servicio.descripcion"
				/>
				<small class="p-error" name="descripcion"></small>
			</div>
		</div>
	</form>
</template>

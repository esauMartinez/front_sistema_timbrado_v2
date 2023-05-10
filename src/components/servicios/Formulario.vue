<script lang="ts" setup>
import { useServicio } from '../../composables/useServicio';

const { servicio } = useServicio();
</script>

<template>
	<form>
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Clave"
					autocomplete="off"
					required
					v-model="servicio.clave"
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Descripcion"
					required
					v-model="servicio.descripcion"
				/>
			</div>
		</div>
	</form>
</template>

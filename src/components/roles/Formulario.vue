<script lang="ts" setup>
import { useRol } from '../../composables/useRol';

const { rol } = useRol();
</script>

<template>
	<form>
		<InputText
			v-model="rol.nombre"
			placeholder="Nombre rol"
			class="w-100"
			required
		/>
	</form>
</template>

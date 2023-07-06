<script lang="ts" setup>
import { ref } from 'vue';
import { router } from '../../router';
import Formulario from '../usuarios/Formulario.vue';
import { useUsuario } from '../../composables/useUsuario';
const visible = ref(true);
const { usuario } = useUsuario();
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Agregar usuario"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
		:closable="true"
	>
		<Formulario />
		<pre>{{ usuario }}</pre>
	</Dialog>
</template>

<style lang="scss" scoped></style>

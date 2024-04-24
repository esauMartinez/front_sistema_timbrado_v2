<script setup lang="ts">
import { onMounted } from 'vue';
import Sidenav from './common/Sidenav.vue';
import { useAuth } from './composables/useAuth';
import { verificarUsuarioAutenticado } from './guards/verificarUsuarioAutenticado';
// import { state, useSocket } from './composables/useSocket';

const {
	estatusUsuarioAutenticado,
	setDarkMode,
	setUsuarioAutenticado,
	verificarDarkMode,
} = useAuth();

// const { connect } = useSocket();

onMounted(() => {
	setDarkMode(verificarDarkMode());
	setUsuarioAutenticado(verificarUsuarioAutenticado());
	const data = JSON.parse(localStorage.getItem('usuario'));
	const rol = localStorage.getItem('rol');
	// if (data !== null && rol !== 'USER_SUPER_ADMIN') {
	// 	connect(`empresa_${data.empresa.id}`, data.id);
	// }
});
</script>

<template>
	<Sidenav v-if="estatusUsuarioAutenticado" />
	<Toast position="bottom-right" />
	<router-view></router-view>
</template>

<style scoped></style>

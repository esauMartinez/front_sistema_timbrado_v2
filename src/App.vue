<script setup lang="ts">
import Sidenav from './common/Sidenav.vue';
import CardLoad from './components/CardLoad.vue';
import { useAuth } from './composables/useAuth';

const { estatusUsuarioAutenticado } = useAuth();

// const data = JSON.parse(localStorage.getItem('usuario'));
// const rol = localStorage.getItem('rol');
// if (data !== null && rol !== 'USER_SUPER_ADMIN') {
// 	connect(`empresa_${data.empresa.id}`, data.id);
// }

// import { state, useSocket } from './composables/useSocket';
// const { connect } = useSocket();
</script>

<template>
	<Sidenav v-if="estatusUsuarioAutenticado" />
	<router-view></router-view>

	<CardLoad />
	<Toast position="top-right" />
</template>

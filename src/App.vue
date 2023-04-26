<script setup lang="ts">
import { onMounted } from 'vue';
import Sidenav from './common/Sidenav.vue';
import { useAuth } from './composables/useAuth';
import { verificarUsuarioAutenticado} from "./guards/verificarUsuarioAutenticado";

const { estatusUsuarioAutenticado, setDarkMode, setUsuarioAutenticado, verificarDarkMode } = useAuth();

onMounted(() => {
	setDarkMode(verificarDarkMode());
	setUsuarioAutenticado(verificarUsuarioAutenticado())
});
</script>

<template>
	<Sidenav v-if="estatusUsuarioAutenticado" />
	<Toast position="bottom-right" />
	<router-view></router-view>
</template>

<style scoped></style>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '@/router';
import Tabla from '@/components/usuarios/Tabla.vue';
import { useRoute } from 'vue-router';
import { useEmpresa } from '@/composables/useEmpresa';
const visible = ref(true);

const route = useRoute();
const { getUsuariosEmpresa } = useEmpresa();

onMounted(async () => {
	await getUsuariosEmpresa(+route.params.id);
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Usuarios"
		:style="{ width: '80vw' }"
		v-on:after-hide="router.go(-1)"
		:closable="true"
	>
		<Tabla :isModule="false" />
	</Dialog>
	<RouterView />
</template>

<style lang="scss" scoped></style>

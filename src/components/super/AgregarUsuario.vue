<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '@/router';
// import Formulario from '@/components/usuarios/Formulario.vue';
// import { useUsuario } from '@/composables/useUsuario';
import { useRoute } from 'vue-router';
import { useEmpresa } from '@/composables/useEmpresa';
const visible = ref(true);
// const { usuario } = useUsuario();
const route = useRoute();

const { postUsuarioEmpresa } = useEmpresa();

onMounted(() => {
	// usuario.value.empresa_id = +route.params.id;
});
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
		<!-- <Formulario
			@submit.prevent="postUsuarioEmpresa(usuario)"
			id="formulario"
			:isModule="false"
		/> -->
		<template #footer>
			<Button
				label="Cancelar"
				icon="pi pi-times"
				@click="visible = false"
				outlined
				severity="danger"
			/>
			<Button
				label="Guardar"
				icon="pi pi-check"
				type="submit"
				form="formulario"
				severity="success"
			/>
		</template>
	</Dialog>
</template>

<style lang="scss" scoped></style>

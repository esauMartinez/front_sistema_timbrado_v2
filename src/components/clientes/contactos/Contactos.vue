<script lang="ts" setup>
import Tabla from './Tabla.vue';
import { ref } from 'vue';
import { router } from '../../../router';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useCliente } from '../../../composables/useCliente';
import Formulario from './Formulario.vue';
import { useAuth } from "../../../composables/useAuth";
const visible = ref(true);

const { contacto, getContactos } = useCliente();
const route = useRoute();
const { getPermiso } = useAuth();

onMounted(async () => {
	await getContactos(+route.params.id);
	contacto.value.cliente_id = +route.params.id;
});
</script>

<template>
	<Dialog
		v-model:visible="visible"
		modal
		header="Contactos cliente"
		:style="{ width: '50vw' }"
		v-on:after-hide="router.go(-1)"
	>
		<Formulario v-if="!getPermiso('MODULO_CLIENTES_CONTACTOS_CREAR')" />
		<Tabla />
	</Dialog>
</template>

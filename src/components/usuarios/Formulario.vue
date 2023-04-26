<script lang="ts" setup>
import { useUsuario } from '../../composables/useUsuario';
import { useRol } from '../../composables/useRol';
import { onMounted } from 'vue';
import { useCliente } from '../../composables/useCliente';

const { roles, getRoles } = useRol();
const { usuario, rolFormateado } = useUsuario();
const { clientes, getClientes } = useCliente();
const verificarTipoUsuario = (tipo: number) => {
	if (tipo === 3) {
		usuario.value.isCliente = true;
	} else {
		usuario.value.isCliente = false;
	}
};

onMounted(async () => {
	await getRoles();
	await getClientes();
	roles.value.map((x) => (x.nombre = rolFormateado(x.nombre)));
});
</script>

<template>
	<form>
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Nombre"
					name="nombre"
					v-model="usuario.nombre"
					autocomplete="off"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Apellido paterno"
					v-model="usuario.paterno"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Apellido materno"
					v-model="usuario.materno"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Email"
					v-model="usuario.email"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<InputText
					class="w-100"
					placeholder="Password"
					v-model="usuario.password"
					required
				/>
			</div>
			<div class="col-lg-12 mb-3">
				<Dropdown
					class="w-100"
					placeholder="Selecciona un rol"
					:options="roles"
					filter
					optionLabel="nombre"
					optionValue="id"
					v-model="usuario.rol_id"
					@change="verificarTipoUsuario(usuario.rol_id)"
				/>
			</div>
			<div class="col-lg-12 mb-3" v-if="usuario.isCliente">
				<Dropdown
					class="w-100"
					placeholder="Cliente"
					:options="clientes"
					filter
					optionLabel="razon_social"
					optionValue="id"
					v-model="usuario.cliente_id"
				/>
			</div>
		</div>
	</form>
</template>

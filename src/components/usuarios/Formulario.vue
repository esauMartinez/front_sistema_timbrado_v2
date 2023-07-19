<script lang="ts" setup>
import { useUsuario } from '../../composables/useUsuario';
import { useRol } from '../../composables/useRol';
import { onMounted } from 'vue';
import { useCliente } from '../../composables/useCliente';

const { roles, getRoles } = useRol();
const { usuario, rolFormateado } = useUsuario();
const { clientes, getClientes } = useCliente();

const props = defineProps({
	isModule: Boolean,
});

const verificarTipoUsuario = (tipo: number) => {
	if (tipo === 3 && props.isModule) {
		usuario.value.isCliente = true;
	} else {
		usuario.value.isCliente = false;
	}
};

onMounted(async () => {
	await getRoles();
	roles.value.map((x) => (x.nombre = rolFormateado(x.nombre)));
	if (props.isModule) {
		await getClientes();
		roles.value = roles.value.filter((x) => x.nombre !== 'SUPER ADMINISTRADOR');
	} else {
		roles.value = roles.value.filter(
			(x) => x.nombre !== 'SUPER ADMINISTRADOR' && x.nombre !== 'CLIENTE'
		);
	}
});
</script>

<template>
	<form class="formulario">
		<div class="row p-2">
			<div class="col-lg-12 mb-3">
				<label>Nombre usuario</label>
				<InputText
					name="nombre"
					class="w-100"
					placeholder="Nombre"
					v-model="usuario.nombre"
					autocomplete="off"
				/>
				<small class="p-error" name="nombre"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Apellido paterno</label>
				<InputText
					name="paterno"
					class="w-100"
					placeholder="Apellido paterno"
					v-model="usuario.paterno"
				/>
				<small class="p-error" name="paterno"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Apellido materno</label>
				<InputText
					name="materno"
					class="w-100"
					placeholder="Apellido materno"
					v-model="usuario.materno"
				/>
				<small class="p-error" name="materno"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Email</label>
				<InputText
					name="email"
					class="w-100"
					placeholder="Email"
					v-model="usuario.email"
				/>
				<small class="p-error" name="email"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Password</label>
				<InputText
					name="password"
					class="w-100"
					placeholder="Password"
					v-model="usuario.password"
				/>
				<small class="p-error" name="password"></small>
			</div>
			<div class="col-lg-12 mb-3">
				<label>Rol de usuario</label>
				<Dropdown
					name="rol_id"
					class="w-100"
					placeholder="Selecciona un rol"
					:options="roles"
					filter
					optionLabel="nombre"
					optionValue="id"
					v-model="usuario.rol_id"
					@change="verificarTipoUsuario(usuario.rol_id)"
				/>
				<small class="p-error" name="rol_id"></small>
			</div>
			<div class="col-lg-12 mb-3" v-if="usuario.isCliente">
				<label>Cliente</label>
				<Dropdown
					name="cliente_id"
					:class="['w-100']"
					placeholder="Cliente"
					:options="clientes"
					filter
					optionLabel="razon_social"
					optionValue="id"
					v-model="usuario.cliente_id"
				/>
				<small class="p-error" name="cliente_id"></small>
			</div>
		</div>
	</form>
</template>

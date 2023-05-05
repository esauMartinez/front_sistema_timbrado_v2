<script lang="ts" setup>
import { useAuth } from '../composables/useAuth';
import '../../public/css/sidenav.scss';
import BotonSalir from './BotonSalir.vue';
import BotonTema from './BotonTema.vue';
import Logotipo from './Logotipo.vue';

const { getRol, getLogotipo, getNombreUsuario } = useAuth();

interface item {
	name: string;
	link: string;
	icon: string;
	isHidden: boolean;
}

const items: item[] = [
	{
		name: 'Inicio',
		link: '/home',
		icon: 'house',
		isHidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		name: 'Clientes',
		link: '/clientes',
		icon: 'briefcase',
		isHidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		name: 'Operadores',
		link: '/operadores',
		icon: 'user-astronaut',
		isHidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		name: 'Tractores',
		link: '/tractores',
		icon: 'truck',
		isHidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		name: 'Cajas',
		link: '/Cajas',
		icon: 'trailer',
		isHidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		name: 'Patios',
		link: '/Patios',
		icon: 'globe',
		isHidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		name: 'Usuarios',
		link: '/usuarios',
		icon: 'users',
		isHidden: getRol() === 'USER_ADMIN' ? false : true,
	},
	{
		name: 'Empresas',
		link: '/super',
		icon: 'shield-halved',
		isHidden: getRol() === 'USER_SUPER_ADMIN' ? false : true,
	},
	{
		name: 'Ajustes',
		link: '/ajustes',
		icon: 'shield-halved',
		isHidden: getRol() === 'USER_ADMIN' ? false : true,
	},
];
</script>

<template>
	<div class="sidenav">
		<!-- <BotonCerrarSidenav /> -->
		<Logotipo />

		<ul class="menu">
			<li
				v-for="item in items"
				:class="{ hide: item.isHidden, 'li-link': true }"
			>
				<router-link :to="{ path: item.link }">
					<font-awesome-icon class="menu__icon" :icon="item.icon" />
					{{ item.name }}
				</router-link>
			</li>

			<BotonSalir />

			<BotonTema />
		</ul>
	</div>
</template>

<style lang="scss" scoped></style>

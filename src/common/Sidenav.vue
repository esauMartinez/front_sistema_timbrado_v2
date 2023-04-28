<script lang="ts" setup>
import { useAuth } from '../composables/useAuth';
import '../../public/css/sidenav.scss';
const { getRol, logout, darkMode, setDarkMode, getLogotipo, getNombreUsuario } =
	useAuth();

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
		<div class="logo-and-name">
			<div>
				<Avatar
					:image="'https://recawi.mx/timbrado_v2_ftp/' + getLogotipo().logotipo"
					size="xlarge"
					class="p-overlay-badge"
					shape="circle"
					v-if="getLogotipo().find"
				/>

				<Avatar
					:label="getLogotipo().razon_social"
					size="xlarge"
					shape="circle"
					style="background-color: #4caf4f; color: #ffffff"
					v-if="!getLogotipo().find"
				/>
			</div>
			<div class="mt-4">
				<h6 class="name-logo">{{ getNombreUsuario() }}</h6>
			</div>
		</div>
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
			<li :class="{ hide: false, 'li-link': true }">
				<a @click="logout()" class="logout-button">
					<font-awesome-icon class="menu__icon" :icon="'right-from-bracket'" />
					Salir
				</a>
			</li>
			<li class="btn-dark-mode">
				<font-awesome-icon class="menu__icon" :icon="'sun'" v-if="!darkMode" />
				<font-awesome-icon class="menu__icon" :icon="'moon'" v-if="darkMode" />
				<InputSwitch
					v-model="darkMode"
					class="switch-dark-mode"
					@change="setDarkMode(darkMode)"
				/>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped></style>

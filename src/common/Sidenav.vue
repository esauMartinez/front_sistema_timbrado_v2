<script lang="ts" setup>
import { useAuth } from '../composables/useAuth';
import '../../public/css/sidenav.scss';
import { onMounted, ref } from 'vue';
import Logotipo from './Logotipo.vue';

const { getRol, logout, darkMode, setDarkMode } = useAuth();

const menu = [
	{
		header: null,
		title: 'Inicio',
		href: '/home',
		icon: 'fa fa-house',
		hidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		header: null,
		title: 'Clientes',
		href: '/clientes',
		icon: 'fa fa-briefcase',
		hidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		header: null,
		title: 'Operadores',
		href: '/operadores',
		icon: 'fa fa-user-astronaut',
		hidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		header: null,
		title: 'Tractores',
		href: '/tractores',
		icon: 'fa fa-truck',
		hidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		header: null,
		title: 'Cajas',
		href: '/Cajas',
		icon: 'fa fa-trailer',
		hidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		header: null,
		title: 'Patios',
		href: '/Patios',
		icon: 'fa fa-globe',
		hidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		header: null,
		title: 'Servcicios',
		href: '/Servicios',
		icon: 'fa fa-box-open',
		hidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		header: null,
		title: 'Trips',
		href: '/Trips',
		icon: 'fa fa-plane-departure',
		hidden:
			getRol() === 'USER_ADMIN' || getRol() === 'USER_EMPLOYEE' ? false : true,
	},
	{
		header: null,
		title: 'Usuarios',
		href: '/usuarios',
		icon: 'fa fa-users',
		hidden: getRol() === 'USER_ADMIN' ? false : true,
	},
	{
		header: null,
		title: 'Empresas',
		href: '/super',
		icon: 'fa fa-shield-halved',
		hidden: getRol() === 'USER_SUPER_ADMIN' ? false : true,
	},
	{
		header: null,
		title: 'Ajustes',
		href: '/ajustes',
		icon: 'fa fa-gear',
		hidden: getRol() === 'USER_ADMIN' ? false : true,
	},
	{
		header: null,
		title: 'Tema',
		href: null,
		icon: 'fa fa-sun',
		hidden: false,
	},
	{
		header: null,
		title: 'Salir',
		href: null,
		icon: 'fa fa-right-from-bracket',
		hidden: false,
	},
];

const theme_sidenav = ref('white-theme');

const onItemClick = (e, item) => {
	if (item.title === 'Salir') {
		logout();
	} else if (item.title === 'Tema') {
		darkMode.value = !darkMode.value;
		setDarkMode(darkMode.value);
		if (darkMode.value) {
			theme_sidenav.value = null;
			menu[menu.length - 2].icon = 'fa fa-moon';
		} else {
			menu[menu.length - 2].icon = 'fa fa-sun';
			theme_sidenav.value = 'white-theme';
		}
	}
};

const collapsedLogo = ref(false);

const onToggleCollapse = (collapsed) => {
	if (collapsed) {
		collapsedLogo.value = true;
		document.body.style.paddingLeft = '65px';
	} else {
		collapsedLogo.value = false;
		document.body.style.paddingLeft = '300px';
	}
};

onMounted(() => {
	if (darkMode.value) {
		theme_sidenav.value = null;
	}
});
</script>

<template>
	<sidebar-menu
		:menu="menu"
		@update:collapsed="onToggleCollapse"
		@item-click="onItemClick"
		:theme="theme_sidenav"
	>
		<template v-slot:header>
			<Logotipo v-if="!collapsedLogo" />
		</template>
	</sidebar-menu>
</template>

<style lang="scss" scoped></style>

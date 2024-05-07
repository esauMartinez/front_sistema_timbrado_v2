<script lang="ts" setup>
import { useAuth } from '../composables/useAuth';
import '../../public/css/sidenav.scss';
import { onMounted, ref } from 'vue';
import Logotipo from './Logotipo.vue';

const { getPermiso, logout, darkMode, setDarkMode } = useAuth();

const menu = [
	{
		header: null,
		title: 'Inicio',
		href: '/home',
		icon: 'fa fa-house',
	},
	{
		title: 'Catalogos',
		icon: 'fa fa-bars',
		hidden:
			getPermiso('CLIENTES', 'ver') &&
			getPermiso('OPERADORES', 'ver') &&
			getPermiso('TRACTORES', 'ver') &&
			getPermiso('CAJAS', 'ver') &&
			getPermiso('PATIOS', 'ver') &&
			getPermiso('SERVICIOS', 'ver'),
		child: [
			{
				href: '/clientes',
				title: 'Clientes',
				icon: 'fa fa-briefcase',
				hidden: getPermiso('CLIENTES', 'ver'),
			},
			{
				title: 'Operadores',
				href: '/operadores',
				icon: 'fa fa-user-astronaut',
				hidden: getPermiso('OPERADORES', 'ver'),
			},
			{
				title: 'Tractores',
				href: '/tractores',
				icon: 'fa fa-truck',
				hidden: getPermiso('TRACTORES', 'ver'),
			},
			{
				title: 'Cajas',
				href: '/Cajas',
				icon: 'fa fa-trailer',
				hidden: getPermiso('CAJAS', 'ver'),
			},
			{
				title: 'Patios',
				href: '/Patios',
				icon: 'fa fa-globe',
				hidden: getPermiso('PATIOS', 'ver'),
			},
			{
				title: 'Servcicios',
				href: '/Servicios',
				icon: 'fa fa-box-open',
				hidden: getPermiso('SERVICIOS', 'ver'),
			},
		],
	},
	{
		header: null,
		title: 'Trips',
		href: '/Trips',
		icon: 'fa fa-plane-departure',
		hidden: getPermiso('TRIPS', 'ver'),
	},
	{
		header: null,
		title: 'Trimbrado',
		href: '/Timbrado',
		icon: 'fa fa-bell',
		hidden: getPermiso('TIMBRADO', 'ver'),
	},
	{
		header: null,
		title: 'Usuarios',
		href: '/usuarios',
		icon: 'fa fa-users',
		hidden: getPermiso('USUARIOS', 'ver'),
	},
	{
		header: null,
		title: 'Empresas',
		href: '/super',
		icon: 'fa fa-shield-halved',
		hidden: getPermiso('EMPRESAS', 'ver'),
	},
	{
		header: null,
		title: 'Roles',
		href: '/roles',
		icon: 'fa fa-address-book',
		hidden: getPermiso('ROLES', 'ver'),
	},
	{
		header: null,
		title: 'Ajustes',
		href: '/ajustes',
		icon: 'fa fa-gear',
		hidden: getPermiso('AJUSTES', 'ver'),
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
		icon: 'fa fa-power-off',
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
		document.body.style.paddingLeft = '290px';
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

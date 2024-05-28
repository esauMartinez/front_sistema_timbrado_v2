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
			getPermiso('MODULO_CLIENTES_VER') &&
			getPermiso('MODULO_OPERADORES_VER') &&
			getPermiso('MODULO_TRACTORES_VER') &&
			getPermiso('MODULO_CAJAS_VER') &&
			getPermiso('MODULO_PATIOS_VER') &&
			getPermiso('MODULO_SERVICIOS_VER'),
		child: [
			{
				href: '/clientes',
				title: 'Clientes',
				icon: 'fa fa-briefcase',
				hidden: getPermiso('MODULO_CLIENTES_VER'),
			},
			{
				title: 'Operadores',
				href: '/operadores',
				icon: 'fa fa-user-astronaut',
				hidden: getPermiso('MODULO_OPERADORES_VER'),
			},
			{
				title: 'Tractores',
				href: '/tractores',
				icon: 'fa fa-truck',
				hidden: getPermiso('MODULO_TRACTORES_VER'),
			},
			{
				title: 'Cajas',
				href: '/Cajas',
				icon: 'fa fa-trailer',
				hidden: getPermiso('MODULO_CAJAS_VER'),
			},
			{
				title: 'Patios',
				href: '/Patios',
				icon: 'fa fa-globe',
				hidden: getPermiso('MODULO_PATIOS_VER'),
			},
			{
				title: 'Servcicios',
				href: '/Servicios',
				icon: 'fa fa-box-open',
				hidden: getPermiso('MODULO_SERVICIOS_VER'),
			},
		],
	},
	{
		header: null,
		title: 'Trips',
		href: '/Trips',
		icon: 'fa fa-suitcase',
		hidden: getPermiso('MODULO_TRIPS_VER'),
	},
	{
		header: null,
		title: 'Timbrado',
		href: '/Timbrado',
		icon: 'fa fa-bell',
		hidden: getPermiso('MODULO_TIMBRADO_VER'),
	},
	{
		header: null,
		title: 'Usuarios',
		href: '/usuarios',
		icon: 'fa fa-users',
		hidden: getPermiso('MODULO_USUARIOS_VER'),
	},
	{
		header: null,
		title: 'Empresas',
		href: '/super',
		icon: 'fa fa-shield-halved',
		hidden: getPermiso('MODULO_EMPRESAS_VER'),
	},
	{
		header: null,
		title: 'Roles',
		href: '/roles',
		icon: 'fa fa-address-book',
		hidden: getPermiso('MODULO_ROLES_VER'),
	},
	{
		header: null,
		title: 'Ajustes',
		href: '/ajustes',
		icon: 'fa fa-gear',
		hidden: getPermiso('MODULO_AJUSTES_VER'),
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

const collapsedLogo = ref(true);

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
		collapsed
	>
		<template v-slot:header>
			<Logotipo v-if="!collapsedLogo" />
		</template>
	</sidebar-menu>
</template>

<style lang="scss" scoped></style>

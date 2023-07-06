import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { instance } from '../helpers/axiosInstance';
import { verificarUsuarioAutenticado } from '../guards/verificarUsuarioAutenticado';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/super',
		name: 'Super',
		component: () => import('../views/Super.vue'),
		children: [
			{
				path: '/agregar-empresa',
				name: 'AgregarEmpresa',
				component: () => import('../components/super/AgregarEmpresa.vue'),
			},
			{
				path: '/usuarios-empresa/:empresa_id',
				name: 'UsuariosEmpresa',
				component: () => import('../components/super/UsuariosEmpresa.vue'),
				children: [
					{
						path: '/agregar-usuario-super',
						name: 'AgregarUsuarioSuper',
						component: () => import('../components/super/AgregarUsuario.vue'),
					},
				],
			},
		],
	},
	{
		path: '/ajustes',
		name: 'Ajustes',
		component: () => import('../views/Ajustes.vue'),
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home.vue'),
	},
	{
		path: '/clientes',
		name: 'Clientes',
		component: () => import('../views/Clientes.vue'),
		children: [
			{
				path: '/agregar-cliente',
				name: 'AgregarCliente',
				component: () => import('../components/clientes/Agregar.vue'),
			},
			{
				path: '/modificar-cliente/:id',
				name: 'ModificarCliente',
				component: () => import('../components/clientes/Modificar.vue'),
			},
		],
	},
	{
		path: '/operadores',
		name: 'Operadores',
		component: () => import('../views/Operadores.vue'),
		children: [
			{
				path: '/agregar-operador',
				name: 'AgregarOperador',
				component: () => import('../components/operadores/Agregar.vue'),
			},
			{
				path: '/modificar-operador/:id',
				name: 'ModificarOperador',
				component: () => import('../components/operadores/Modificar.vue'),
			},
		],
	},
	{
		path: '/usuarios',
		name: 'Usuarios',
		component: () => import('../views/Usuarios.vue'),
		children: [
			{
				path: '/agregar-usuario',
				name: 'AgregarUsuario',
				component: () => import('../components/usuarios/Agregar.vue'),
			},
			{
				path: '/modificar-usuario/:id',
				name: 'ModificarUsuario',
				component: () => import('../components/usuarios/Modificar.vue'),
			},
		],
	},
	{
		path: '/tractores',
		name: 'Tractores',
		component: () => import('../views/Tractores.vue'),
		children: [
			{
				path: '/agregar-tractor',
				name: 'AgregarTractor',
				component: () => import('../components/tractores/Agregar.vue'),
			},
			{
				path: '/modificar-tractor/:id',
				name: 'ModificarTractor',
				component: () => import('../components/tractores/Modificar.vue'),
			},
		],
	},
	{
		path: '/cajas',
		name: 'Cajas',
		component: () => import('../views/Cajas.vue'),
		children: [
			{
				path: '/agregar-caja',
				name: 'AgregarCaja',
				component: () => import('../components/cajas/Agregar.vue'),
			},
			{
				path: '/modificar-caja/:id',
				name: 'ModificarCaja',
				component: () => import('../components/cajas/Modificar.vue'),
			},
		],
	},
	{
		path: '/patios',
		name: 'Patios',
		component: () => import('../views/Patios.vue'),
		children: [
			{
				path: '/agregar-patio',
				name: 'AgregarPatio',
				component: () => import('../components/patios/Agregar.vue'),
			},
			{
				path: '/modificar-patio/:id/:type',
				name: 'ModificarPatio',
				component: () => import('../components/patios/Modificar.vue'),
			},
		],
	},
	{
		path: '/servicios',
		name: 'Servicios',
		component: () => import('../views/Servicios.vue'),
		children: [
			{
				path: '/agregar-servicio',
				name: 'AgregarServicio',
				component: () => import('../components/servicios/Agregar.vue'),
			},
			{
				path: '/modificar-servicio/:id',
				name: 'ModificarServicio',
				component: () => import('../components/servicios/Modificar.vue'),
			},
		],
	},
	{
		path: '/trips',
		name: 'Trips',
		component: () => import('../views/Trips.vue'),
		children: [
			{
				path: '/modificar-trip/:id',
				name: 'ModificarTrip',
				component: () => import('../components/trips/Modificar.vue'),
				children: [
					{
						path: '/agregar-movimiento/:id',
						name: 'AgregarMovimiento',
						component: () =>
							import('../components/trips/datos/piernas/AgregarMovimiento.vue'),
					},
					{
						path: '/informacion-patio/:id/:type',
						name: 'InformacionPatio',
						component: () => import('../components/patios/Modificar.vue'),
					},
				],
			},
		],
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (verificarUsuarioAutenticado() && to.name === 'Login') {
		next('/home');
	} else {
		if (!verificarUsuarioAutenticado() && to.name !== 'Login') {
			next('/');
		} else {
			next();
		}
	}
});

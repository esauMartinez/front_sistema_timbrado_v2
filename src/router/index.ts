import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { verificarUsuarioAutenticado } from '../guards/verificarUsuarioAutenticado';
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';
import { useAuth } from '../composables/useAuth';
import { verificarDarkMode } from '../guards/verificarDarkMode';

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
				path: '/usuarios-empresa/:id',
				name: 'UsuariosEmpresa',
				component: () => import('../components/super/UsuariosEmpresa.vue'),
				children: [
					{
						path: '/agregar-usuario-super/:id',
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
			{
				path: '/bitacora-cliente/:id',
				name: 'BitacoraCliente',
				component: () => import('../components/clientes/Bitacora.vue'),
			},
			{
				path: '/contactos-cliente/:id',
				name: 'ContactosCliente',
				component: () => import('../components/clientes/contactos/Contactos.vue'),
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
				children: [
					{
						path: '/agregar-marca-tractor/:tipo',
						name: 'AgregarMarcaTractor',
						component: () => import('../components/marcas/Agregar.vue'),
					},
				],
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
				children: [
					{
						path: '/agregar-marca-caja/:tipo',
						name: 'AgregarMarcaCaja',
						component: () => import('../components/marcas/Agregar.vue'),
					},
				],
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
						path: '/agregar-cliente-trip/:id',
						name: 'AgregarClienteTrip',
						component: () => import('../components/trips/datos/Cliente.vue'),
					},
					{
						path: '/agregar-operador-trip/:id',
						name: 'AgregarOperadorTrip',
						component: () => import('../components/trips/datos/Operador.vue'),
					},
					{
						path: '/agregar-caja-trip/:id',
						name: 'AgregarCajaTrip',
						component: () => import('../components/trips/datos/Caja.vue'),
					},
					{
						path: '/agregar-tractor-trip/:id',
						name: 'AgregarTractorTrip',
						component: () => import('../components/trips/datos/Tractor.vue'),
					},
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
					{
						path: '/pdf-trip/pdf/:id',
						name: 'PDFTrip',
						component: () => import('../components/PDFTrip.vue'),
					},
				],
			},
			{
				path: '/bitacora-trip/:id',
				name: 'BitacoraTrip',
				component: () => import('../components/trips/bitacora/Bitacora.vue'),
			},
		],
	},
	{
		path: '/timbrado',
		name: 'Timbrado',
		component: () => import('../views/Timbrado.vue'),
		children: [
			{
				path: '/timbrar-trip/:id',
				name: 'TimbrarTrip',
				component: () => import('../components/timbrado/Modificar.vue'),
				children: [
					{
						path: '/timbre-agregar-servicio-trip/:id',
						name: 'TimbreAgregarServicio',
						component: () =>
							import('../components/timbrado/servicios/AgregarServicio.vue'),
					},
					{
						path: '/agregar-mercancia-trip/:id',
						name: 'AgregarMercanciaTrip',
						component: () =>
							import('../components/timbrado/mercancias/Agregar.vue'),
					},
					{
						path: '/pdf-timbre/pdf/:id',
						name: 'PDFTimbre',
						component: () => import('../components/PDFTimbre.vue'),
					},
				],
			},
		],
	},
	{
		path: '/roles',
		name: 'Roles',
		component: () => import('../views/Roles.vue'),
		children: [
			{
				path: '/agregar-rol',
				name: 'AgregarRol',
				component: () => import('../components/roles/Agregar.vue'),
			},
			{
				path: '/modificar-rol/:id',
				name: 'ModificarRol',
				component: () => import('../components/roles/Modificar.vue'),
			},
		],
	},
	{
		path: '/cotizaciones',
		name: 'Cotizaciones',
		component: () => import('../views/Cotizacion.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('../views/Home.vue'),
	},
];

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	const { estatusUsuarioAutenticado } = storeToRefs(authStore);
	const { setUsuarioAutenticado, setDarkMode } = useAuth();

	if (!verificarUsuarioAutenticado() && to.name !== 'Login') {
		next('/');
		estatusUsuarioAutenticado.value = false;
	} else {
		if (to.name === 'Login' && verificarUsuarioAutenticado()) {
			next('/home');
		} else {
			next();
		}
	}

	setUsuarioAutenticado(verificarUsuarioAutenticado());
	setDarkMode(verificarDarkMode());
});

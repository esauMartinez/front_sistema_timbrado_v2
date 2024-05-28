import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { router } from '../router';
import { Rol } from '../interfaces/rol.model';
import { useAuthStore } from '../store/auth';
import { Auth } from '../interfaces/auth.model';
import { handleError } from '../helpers/messages';
import { useSocket } from './useSocket';

export const useAuth = () => {
	const authStore = useAuthStore();
	const { auth, estatusUsuarioAutenticado, darkMode } = storeToRefs(authStore);
	// const { connect, disconnect } = useSocket();

	const authUser = async (auth: Auth) => {
		try {
			const { data } = await instance.post('/login', {
				email: auth.email,
				password: auth.password,
			});
			console.log(data);
			authStore.setToken(data.data);
			renderizarTipo(data.data.role);
			// if (data.data.empresa) {
			// 	connect(`empresa_${data.data.empresa.id}`, data.data.id);
			// }
		} catch (err) {
			handleError(err);
		}
	};

	const renderizarTipo = async (rol: Rol) => {
		if (rol.nombre === 'USER_SUPER_ADMIN') {
			router.push({ path: '/super' });
		} else if (rol.nombre === 'USER_CLIENT') {
			router.push({ path: '/cotizaciones' });
		} else {
			router.push({ path: '/home' });
		}
		authStore.setUsuarioAutenticado(true, false);
		authStore.resetLoginForm();
		localStorage.setItem('rol', rol.nombre);
	};

	const getPermiso = (permiso): boolean => {
		const {
			role: { permisos },
		} = JSON.parse(localStorage.getItem('usuario'));

		const verificar_permiso = permisos.find((x) => x.nombre === permiso);
		return verificar_permiso === undefined ? true : false;
	};

	const getNombreUsuario = () => {
		const data = JSON.parse(localStorage.getItem('usuario'));
		return `${data.nombre} ${data.paterno}`;
	};

	const getLogotipo = () => {
		const data = JSON.parse(localStorage.getItem('usuario'));
		if (
			data.role.nombre === 'USER_SUPER_ADMIN' ||
			data.role.nombre === 'USER_CLIENT'
		) {
			return {
				find: false,
				razon_social: 'SUPER'.substring(0, 2),
			};
		} else {
			if (data.empresa.logotipo === null) {
				return {
					find: false,
					razon_social: data.empresa.razon_social.substring(0, 2),
				};
			} else {
				return { find: true, logotipo: data.empresa.logotipo };
			}
		}
	};

	const compararUsuarioId = (id: number): boolean => {
		const usuario = JSON.parse(localStorage.getItem('usuario'));
		if (id === usuario.id) {
			return true;
		}
		return false;
	};

	const setDarkMode = (darkMode: boolean) => {
		authStore.setDarkMode(darkMode);
	};

	const logout = (): void => {
		// const rol = localStorage.getItem('rol');
		localStorage.removeItem('rol');
		localStorage.removeItem('usuario');
		document.body.style.paddingLeft = '0px';
		setUsuarioAutenticado(false);
		// if (rol !== 'USER_SUPER_ADMIN') {
		// 	disconnect();
		// }
		router.push({ path: '/' });
	};

	const setUsuarioAutenticado = (estatu: boolean) => {
		const darkMode: boolean = JSON.parse(localStorage.getItem('dark-mode'));
		authStore.setUsuarioAutenticado(estatu, darkMode);
	};

	return {
		auth,
		estatusUsuarioAutenticado,
		darkMode,
		authUser,
		getPermiso,
		logout,
		compararUsuarioId,
		setDarkMode,
		getNombreUsuario,
		getLogotipo,
		setUsuarioAutenticado,
	};
};

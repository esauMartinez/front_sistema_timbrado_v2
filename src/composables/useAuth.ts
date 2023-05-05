import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { router } from '../router';
import { useToast } from 'primevue/usetoast';
import { Rol } from '../interfaces/rol.model';
import { useAuthStore } from '../store/auth';
import { Auth } from '../interfaces/auth.model';

export const useAuth = () => {
	const authStore = useAuthStore();
	const { auth, estatusUsuarioAutenticado, darkMode } = storeToRefs(authStore);
	const toast = useToast();

	const authUser = async (auth: Auth) => {
		try {
			const { data } = await instance.post('/login', {
				email: auth.email,
				password: auth.password,
			});
			authStore.setToken(data.data);
			renderizarTipo(data.data.role);
		} catch (error) {
			toast.add({
				severity: 'error',
				summary: 'Usuario',
				detail: error.response.data.data,
				life: 3000,
			});
		}
	};

	const renderizarTipo = async (rol: Rol) => {
		if (rol.nombre === 'USER_SUPER_ADMIN') {
			router.push({ path: '/super' });
		} else {
			router.push({ path: '/home' });
		}
		authStore.setUsuarioAutenticado(true, false);
		authStore.resetLoginForm();
		localStorage.setItem('rol', rol.nombre);
	};

	const getRol = (): string => {
		return localStorage.getItem('rol');
	};

	const getNombreUsuario = () => {
		const data = JSON.parse(localStorage.getItem('usuario'));
		return data.nombre + ' ' + ' ' + data.paterno + ' ' + data.materno;
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

	const verificarDarkMode = (): boolean => {
		const darkModeStorage: boolean = JSON.parse(
			localStorage.getItem('dark-mode')
		);
		return darkModeStorage;
	};

	const logout = (): void => {
		localStorage.removeItem('rol');
		localStorage.removeItem('usuario');
		document.body.style.paddingLeft = '0px';
		setUsuarioAutenticado(false);
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
		getRol,
		logout,
		compararUsuarioId,
		setDarkMode,
		getNombreUsuario,
		getLogotipo,
		setUsuarioAutenticado,
		verificarDarkMode
	};
};

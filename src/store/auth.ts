import { defineStore } from 'pinia';
import { Auth } from '../interfaces/auth.model';
import { instance } from '../helpers/axiosInstance';

interface AuthStore {
	auth: Auth;
	estatusUsuarioAutenticado: boolean;
	darkMode: boolean;
}

export const useAuthStore = defineStore('auth', {
	state: (): AuthStore => ({
		auth: {
			email: '',
			password: '',
		},
		estatusUsuarioAutenticado: false,
		darkMode: false,
	}),
	actions: {
		resetLoginForm() {
			this.auth = {
				email: '',
				password: '',
			};
		},
		setUsuarioAutenticado(
			estatusUsuarioAutenticado: boolean,
			darkMode: boolean
		) {
			this.estatusUsuarioAutenticado = estatusUsuarioAutenticado;
			this.darkMode = darkMode;
			if (this.estatusUsuarioAutenticado) {
				document.body.style.paddingLeft = '290px';
			} else {
				this.setDarkMode(false);
			}
		},
		setToken(usuario: any) {
			instance.defaults.headers.common[
				'Authorization'
			] = `Bearer ${usuario.token}`;
			localStorage.setItem('usuario', JSON.stringify(usuario));
		},
		setDarkMode(darkMode: boolean) {
			const body = document.body;
			if (darkMode) {
				body.classList.remove('light-mode');
				body.classList.add('dark-mode');
			} else {
				body.classList.remove('dark-mode');
				body.classList.add('light-mode');
			}
			this.darkMode = darkMode;
			localStorage.setItem('dark-mode', JSON.stringify(this.darkMode));
		},
	},
});

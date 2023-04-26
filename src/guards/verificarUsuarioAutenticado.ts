import { instance } from "../helpers/axiosInstance";

export const verificarUsuarioAutenticado = () => {
	const data = JSON.parse(localStorage.getItem('usuario'));
	if (data === null || data === undefined) {
		return false;
	} else {
		instance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
		return true;
	}
};

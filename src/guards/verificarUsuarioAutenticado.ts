import { instance } from '../helpers/axiosInstance';
import { socket } from "../services/socket";

export const verificarUsuarioAutenticado = () => {
	const data = JSON.parse(localStorage.getItem('usuario'));

	if (data === null || data === undefined) {
		return false;
	} else {
		instance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
		return true;
	}
};

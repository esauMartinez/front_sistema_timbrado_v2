import Swal from 'sweetalert2';
import { router } from '../router';
import { useAuth } from '../composables/useAuth';

export const success = (payload) => {
	Swal.fire({
		position: 'top-end',
		icon: 'success',
		title: payload,
		showConfirmButton: false,
		timer: 1500,
	});
};

export const notFound = (payload) => {
	Swal.fire({
		icon: 'warning',
		title: 'Oops...',
		text: payload,
	});
};

export const error = (payload) => {
	switch (payload.response.status) {
		case 401:
			localStorage.removeItem('usuario');
			unauthorized();
			break;
		default:
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: payload,
			});
			break;
	}
};

const unauthorized = () => {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'No tienes permisos para acceder a este recurso',
		allowEnterKey: false,
		allowOutsideClick: false,
		allowEscapeKey: false,
	}).then(() => {
		router.push('/');
	});
};

export const question = () => {
	return Swal.fire({
		title: 'Estas seguro?',
		text: 'No podras revertir esto!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, eliminar!',
		cancelButtonText: 'Cancelar',
	});
};

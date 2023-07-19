import Swal from 'sweetalert2';
import { router } from '../router';

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

const unauthorized = () => {
	localStorage.removeItem('usuario');
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

export const errorServer = () => {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Hubo un error',
	});
};

const last_erorrs = {
	value: [],
};

export const errorValidations = (errores) => {
	if (last_erorrs.value.length !== 0) {
		last_erorrs.value.forEach((element: any) => {
			document.getElementsByName(element.path)[0].classList.remove('p-invalid');
			document.getElementsByName(element.path)[1].innerHTML = '';
		});
	}

	for (let i = 0; i < errores.length; i++) {
		const element = errores[i];
		document.getElementsByName(element.path)[0].classList.add('p-invalid');
		document.getElementsByName(
			element.path
		)[1].innerHTML = `<p class="mt-2 mb-0 d-flex align-items-center">&#9888 ${element.message}</p>`;
	}

	last_erorrs.value = errores;
};

export const handleError = (payload) => {
	switch (payload.response.status) {
		case 401:
			unauthorized();
			break;
		case 404:
			notFound(payload.response.data.data);
			break;
		case 400:
			errorValidations(payload.response.data.errors);
			break;
		case 402:
			notFound(payload.response.data.data);
			break;
		case 500:
			errorServer();
			break;
	}
};

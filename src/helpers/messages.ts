import Swal from 'sweetalert2';
import { router } from '@/router';
import { useError } from '@/composables/useError';

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
		text: 'No tienes permisos para acceder a este recurso o tu sesion a expirado',
		allowEnterKey: false,
		allowOutsideClick: false,
		allowEscapeKey: false,
	}).then(() => {
		router.push('/');
	});
};

export const question = (
	text: string = 'No podras revertir esto!',
	confirmButtonText: string = 'Si, eliminar!'
) => {
	return Swal.fire({
		title: 'Estas seguro?',
		text,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText,
		cancelButtonText: 'No',
	});
};

export const errorServer = () => {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Hubo un error',
	});
};

export const errorDeleting = (error: ErrorTimbre) => {
	Swal.fire({
		icon: 'warning',
		title: error.messageDetail,
		text: error.message,
	});
};

interface ErrorTimbre {
	data: string;
	message: string;
	messageDetail: string;
	status: string;
}

export const errorTimbre = (error: ErrorTimbre) => {
	Swal.fire({
		icon: 'error',
		title: error.messageDetail,
		text: error.message,
	});
};

export const errorValidations = (lista_errores) => {
	const { errores, setErrores } = useError();
	if (errores.value.length !== 0) {
		errores.value.forEach((element: any) => {
			document.getElementsByName(element.path)[0].classList.remove('p-invalid');
			document.getElementsByName(element.path)[1].innerHTML = '';
		});
	}

	for (let i = 0; i < lista_errores.length; i++) {
		const element = lista_errores[i];
		document.getElementsByName(element.path)[0].classList.add('p-invalid');
		document.getElementsByName(
			element.path
		)[1].innerHTML = `<p class="mt-2 mb-0 d-flex align-items-center">&#9888 ${element.message}</p>`;
	}

	setErrores(lista_errores);
};

export const handleError = (payload) => {
	console.log(payload.response.status);
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
		case 403:
			errorTimbre(payload.response.data);
			break;
		case 405:
			errorDeleting(payload.response.data);
			break;
		case 500:
			errorServer();
			break;
	}
};

export const comentarios = () => {
	return new Promise((resolve, reject) => {
		Swal.fire({
			title: 'Comentarios',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off',
			},
			showCancelButton: true,
			confirmButtonText: 'Aceptar',
			cancelButtonText: 'Cancelar',
			showLoaderOnConfirm: false,
		}).then((result) => {
			resolve(result);
		});
	});
};

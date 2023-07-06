export function validateField(value) {
	console.log(value);
	if (!value || value.length < 1) {
		return 'Campo requerido';
	}

	return true;
}

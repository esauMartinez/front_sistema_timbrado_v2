export function validateField(value) {
	if (!value || value.length < 1) {
		return 'Campo requerido';
	}

	return true;
}

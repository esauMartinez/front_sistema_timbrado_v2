export const severity = (estatus) => {
	if (estatus) {
		return 'success';
	}
	return 'danger';
};


export const severityTrip = (estatus: string) => {
	if (estatus.toLowerCase() === 'creado') {
		return 'info';
	}
	return 'danger';
}
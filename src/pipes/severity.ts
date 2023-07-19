export const severity = (estatus) => {
	if (estatus) {
		return 'success';
	}
	return 'danger';
};

export const severityTrip = (estatus: string) => {
	let severity = null;
	switch (estatus) {
		case 'CREADO':
			severity = 'info';
			break;
		case 'PROGRAMADO':
			severity = 'warning';
			break;
		case 'TRANSITO':
			severity = 'success';
			break;
	}
	return severity;
};

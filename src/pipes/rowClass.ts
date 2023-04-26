export const rowClass = (data) => {
	return [
		{
			'bg-danger': data.estatus === false,
			'text-white': data.estatus === false,
		},
	];
};
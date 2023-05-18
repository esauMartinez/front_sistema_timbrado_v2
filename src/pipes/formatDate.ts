import moment from 'moment';

export const formatDate = (date: Date): string => {
	return moment(date).format('DD/MM/YYYY');
};

export const formatDateWithTime = (date: Date) => {
	return moment(date).format('DD/MM/YYYY hh:mm:ss');
};

import axios from 'axios'

export const instance = axios.create({
	baseURL: '/timbrado',
});

export const instance_servicio_postal = axios.create({
	baseURL: '/servicio_postal',
});
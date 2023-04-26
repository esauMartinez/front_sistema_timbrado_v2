import axios from 'axios'

export const instance = axios.create({
	baseURL: '/timbrado',
	timeout: 1000
});

import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://api-timbrado-pruebas-91ba3cef374b.herokuapp.com/api/v2',
});

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	define: {
		// enable hydration mismatch details in production build
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
	},
	// base: '/timbrado/',
	// base: '/pruebas/',
	server: {
		port: 3100,
		// proxy: {
		// 	'/timbrado': {
		// 		target: 'https://api-timbrado-pruebas-91ba3cef374b.herokuapp.com/api/v2',
		// 		changeOrigin: true,
		// 		rewrite: (path) => path.replace(/^\/timbrado/, ''),
		// 	},
		// },
	},
});

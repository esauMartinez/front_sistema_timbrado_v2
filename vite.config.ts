import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		port: 3100,
		proxy: {
			'/timbrado': {
				target: 'https://api-timbrado-pruebas-91ba3cef374b.herokuapp.com/api/v2',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/timbrado/, ''),
			},	
		},
	},
});

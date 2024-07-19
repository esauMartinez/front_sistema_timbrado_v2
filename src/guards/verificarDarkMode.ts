export const verificarDarkMode = (): boolean => {
	const darkMode = localStorage.getItem('dark-mode')!;
	const darkModeStorage: boolean = JSON.parse(darkMode);
	return darkModeStorage;
};

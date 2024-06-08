import { storeToRefs } from 'pinia';
import { useErroresStore } from '@/store/errores';
import { Error } from '@/interfaces/error';

export const useError = () => {
	const errorStore = useErroresStore();
	const { errores } = storeToRefs(errorStore);

	const setErrores = (payload: Error[]) => {
		errorStore.setErrores(payload);
	};

	return {
		errores,
    setErrores
	};
};

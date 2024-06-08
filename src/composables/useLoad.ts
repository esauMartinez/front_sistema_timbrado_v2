import { useLoadStore } from '@/store/load';
import { storeToRefs } from 'pinia';

export const useLoad = () => {
	const loadStore = useLoadStore();
	const { isLoading } = storeToRefs(loadStore);

	return {
		isLoading,
	};
};

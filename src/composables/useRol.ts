import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { error } from '../helpers/messages';
import { useRolStore } from '../store/rol';

export const useRol = () => {
	const rolStore = useRolStore();
	const { rol, roles } = storeToRefs(rolStore);

	const getRoles = async () => {
		try {
			const { data } = await instance.get('/roles');
			rolStore.setRoles(data);
		} catch (err) {
			error(err);
		}
	};

	return {
		rol,
		roles,
		getRoles,
	};
};

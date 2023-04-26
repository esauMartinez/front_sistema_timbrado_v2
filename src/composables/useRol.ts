import { storeToRefs } from 'pinia';
import { instance } from '../helpers/axiosInstance';
import { error } from '../helpers/messages';
import { useRolStore } from '../store/rol';

export const useRol = () => {
	const useRol = useRolStore();
	const { rol, roles } = storeToRefs(useRol);

	const getRoles = async () => {
		try {
			const { data } = await instance.get('/roles');
			useRol.setRoles(data);
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

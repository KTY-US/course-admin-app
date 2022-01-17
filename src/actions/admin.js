import { toast } from 'react-toastify';

import * as api from '../apis/admin';
import { adminActions } from '../reducers/admin';

export const createAdmin = (form, navigate, setErrorCredential) => async () => {
	try {
		await api.createAdmin(form);
		navigate('/admins');
		toast.success('Create admin account successful!!!');
	} catch ({ response }) {
		setErrorCredential(response?.data.message);
	} finally {
		// no-thing
	}
};

export const getAdmins = (page, rowPerPage, sortMode, searchString) => async (dispatch) => {
	try {
		dispatch(adminActions.changeIsLoading(true));
		const { data } = await api.getAdmins(page, rowPerPage, sortMode, searchString);
		dispatch(adminActions.storeAdmins(data));
	} catch (error) {
		toast.error(error.message);
	} finally {
		dispatch(adminActions.changeIsLoading(false));
	}
};
